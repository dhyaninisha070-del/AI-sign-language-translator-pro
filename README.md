# 🤟 AI Sign Language Translator Pro

> **Production-grade, real-time ASL recognition with BiLSTM + Attention deep learning, hybrid NLP sentence generation, multi-language translation, and a futuristic Streamlit dashboard.**

---

## ✨ Features

| Category | Capabilities |
|---|---|
| **Real-Time Detection** | Browser webcam via WebRTC, FPS counter, confidence overlay, HUD |
| **Deep Learning Model** | Conv1D → BiLSTM × 2 → Multi-Head Attention → Dense classifier |
| **Landmark Extraction** | MediaPipe Holistic (pose + hands + face) → 205-dim feature vector |
| **NLP Engine** | Sub-millisecond ASL-aware syntactic parser + async T5 neural correction |
| **Tense Generation** | Present, Past, Future tense all generated simultaneously |
| **Multilingual** | 8 languages via Google Translate API |
| **TTS / STT** | Browser Web Speech API (no external dependencies) |
| **Export** | TXT, CSV, DOCX, PDF |
| **Analytics** | Gesture frequency bar chart, confidence-over-time line chart |

---

## 🏗️ Architecture

```
Browser Webcam
      │
      ▼
WebRTC (streamlit-webrtc)
      │
      ▼
MediaPipe Holistic ──► Landmark Extraction (Gest_Landmark.py)
      │                 205-dim feature vector per frame
      ▼
Gesture Sequence Buffer (64 frames, interpolated)
      │
      ▼
Scale-Invariant Normalization
   ├─ Pose: shoulder-width normalization
   └─ Hands: mean-span normalization
      │
      ▼
TF Model (best_model_runtime.keras)
   Conv1D → BiLSTM → BiLSTM → MultiHeadAttention → Dense
      │
      ▼
Prediction → Confidence Filter → Word Buffer
      │
      ▼
ASL NLP Engine (asl_nlp.py)
   ├─ Rule-based Syntactic Parser (< 1ms)
   └─ T5 Neural Correction (async, background thread)
      │
      ▼
Streamlit UI Dashboard
```

---

## 📦 Project Structure

```
SIGN-LANGUAGE-AI/
├── app.py                   # Main FastAPI web application
├── Gest_Landmark.py         # MediaPipe feature extraction module
├── asl_nlp.py               # NLP sentence generator + T5 wrapper
├── build_dataset.py         # WLASL dataset processor
├── extract_features.py      # Video → fixed-length feature sequences
├── train_model.py           # Model training (BiLSTM + Attention)
├── test_system.py           # Integration test suite
├── requirements.txt         # Python dependencies
├── label_map.json           # Class ID → ASL word mapping (100 signs)
├── best_model_runtime.keras # Pre-trained Keras model (H5 format)
└── best_model.keras/        # Directory-format model (Keras 3)
```

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Create virtual environment (recommended)
python -m venv .venv
.venv\Scripts\activate          # Windows
# source .venv/bin/activate    # macOS/Linux

# Install requirements
pip install -r requirements.txt
```

### 2. Run Integration Tests

```bash
python test_system.py
```

Expected output:
```
[OK] asl_nlp imported successfully.
[OK] Export libraries imported.
[OK] Parser present tense check passed.
[OK] Multi-tense verification passed.
[OK] Translation API check passed.
[OK] PDF generation passed.
[OK] DOCX generation passed.
*** ALL SYSTEM INTEGRATION TESTS PASSED ***
```

### 3. Launch the App

```bash
python app.py
```

Then open **http://localhost:8000** in your browser.

---

## 🧠 Model Details

| Parameter | Value |
|---|---|
| Input shape | `(64, 205)` — 64 frames × 205 features |
| Architecture | Conv1D + 2× BiLSTM + Multi-Head Attention |
| Parameters | ~480K |
| Classes | 100 ASL signs (WLASL-100 subset) |
| Normalization | Shoulder-width (pose) + mean-span (hands) |
| Augmentation | Noise, scale, temporal shift, masking, time-warp, hand-dropout |
| Target latency | < 300ms end-to-end |

### Feature Vector Breakdown

| Segment | Landmarks | Features |
|---|---|---|
| Pose (upper body) | 13 landmarks × 4 (x,y,z,visibility) | 52 |
| Face (key points) | 9 landmarks × 3 (x,y,z) | 27 |
| Left Hand | 21 landmarks × 3 | 63 |
| Right Hand | 21 landmarks × 3 | 63 |
| **Total** | | **205** |

---

## 🔁 Training Your Own Model

### 1. Prepare Dataset

Download WLASL dataset files and place in project root:
- `WLASL_v0.3.json`
- `nslt_100.json`
- `videos/` directory with `.mp4` files

### 2. Build Feature Dataset

```bash
python build_dataset.py
```
Produces `features_dataset.npz`

### 3. Train

```bash
python train_model.py
```
Saves `best_model.keras` with early stopping + LR scheduling.

---

## 🌐 NLP Engine

The `asl_nlp.py` module contains two layers:

### Layer 1: Rule-Based ASL Refiner (always active, ~0.1ms)
- Classifies 100 ASL words into grammatical roles (Subject, Verb, Object, Location, Time, Adjective, etc.)
- Handles shortcuts for common phrases (`"hello"` → `"Hello!"`)
- Generates grammatically correct sentences for all 3 tenses

### Layer 2: T5 Neural Engine (optional, async background thread)
- Uses `mrm8488/t5-small-finetuned-common_gen` for neural grammar correction
- Loaded asynchronously — app never blocks waiting for it
- Requires `pip install transformers torch` (commented out in requirements.txt)

---

## 📊 Supported ASL Signs (100 classes)

The model recognizes 100 common ASL words including:

**Nouns:** man, woman, son, mother, cousin, doctor, secretary, dog, cat, bird, fish, cow...  
**Verbs:** eat, drink, go, study, work, play, cook, dance, help, want, need, like...  
**Objects:** apple, pizza, corn, book, computer, basketball, bowling, chair, table...  
**Locations:** school, city, bed, africa  
**Adjectives:** hot, cool, dark, tall, short, thin, full, fine, wrong, right...  
**Time:** now, before, later, thursday, thanksgiving, year, last...  
**Colors:** black, blue, brown, orange, pink, purple, white  

---

## ⚙️ Configuration

| Setting | Default | Description |
|---|---|---|
| Confidence Threshold | 35% | Minimum confidence to accept a prediction |
| Robust Hand-Swap Mode | On | Mirror one-handed gestures to correct off-hand predictions |
| Large Text Mode | Off | Accessibility — enlarges output text |

---

## 📄 License

This project is intended for research and educational use.  
WLASL dataset usage is subject to its own [license terms](https://github.com/dxli94/WLASL).
