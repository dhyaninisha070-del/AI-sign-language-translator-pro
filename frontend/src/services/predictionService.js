// Frontend-only: All API calls return dummy data for demonstration

export const getLabelMap = async () => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return dummy label map
    return {
      0: 'Hello',
      1: 'Thank You',
      2: 'Please',
      3: 'Sorry',
      4: 'Yes',
      5: 'No',
      6: 'Good',
      7: 'Love',
      8: 'Help',
      9: 'Stop',
    };
  } catch (error) {
    console.error('Error fetching label map:', error);
    throw error;
  }
};

export const predictGesture = async (payload) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return dummy prediction
    const gestures = ['Hello', 'Thank You', 'Please', 'Sorry', 'Yes', 'No', 'Good', 'Love', 'Help', 'Stop'];
    const randomGesture = gestures[Math.floor(Math.random() * gestures.length)];
    const randomConfidence = (85 + Math.random() * 14).toFixed(1);
    
    return {
      gesture: randomGesture,
      confidence: parseFloat(randomConfidence),
      present: randomGesture.toLowerCase(),
      past: `was ${randomGesture.toLowerCase()}`,
      future: `will ${randomGesture.toLowerCase()}`,
      sentence: `I ${randomGesture.toLowerCase()} you`,
      fullSentence: `Hello, I ${randomGesture.toLowerCase()} you very much`,
      predictionStatus: 'Active',
      timestamp: new Date().toISOString(),
      id: Date.now(),
    };
  } catch (error) {
    console.error('Error predicting gesture:', error);
    throw error;
  }
};

export const getPredictionHistory = async (params = {}) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return dummy history
    const gestures = ['Hello', 'Thank You', 'Please', 'Sorry', 'Yes', 'No', 'Good', 'Love', 'Help', 'Stop'];
    return Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() - i * 1000,
      gesture: gestures[Math.floor(Math.random() * gestures.length)],
      confidence: parseFloat((85 + Math.random() * 14).toFixed(1)),
      present: gestures[Math.floor(Math.random() * gestures.length)].toLowerCase(),
      past: `was ${gestures[Math.floor(Math.random() * gestures.length)].toLowerCase()}`,
      future: `will ${gestures[Math.floor(Math.random() * gestures.length)].toLowerCase()}`,
      sentence: `I ${gestures[Math.floor(Math.random() * gestures.length)].toLowerCase()} you`,
      fullSentence: `Hello, I ${gestures[Math.floor(Math.random() * gestures.length)].toLowerCase()} you very much`,
      predictionStatus: 'Active',
      timestamp: new Date(Date.now() - i * 60000).toISOString(),
      language: 'English',
      tense: 'Present',
      status: 'success',
    }));
  } catch (error) {
    console.error('Error fetching prediction history:', error);
    throw error;
  }
};

export const deletePrediction = async (id) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Return success
    return { success: true, id };
  } catch (error) {
    console.error('Error deleting prediction:', error);
    throw error;
  }
};

export const getAnalytics = async (params = {}) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return dummy analytics
    return {
      totalPredictions: 1247,
      avgConfidence: 94.2,
      accuracy: 97.8,
      activeSessions: 234,
      topGestures: [
        { gesture: 'Hello', count: 245 },
        { gesture: 'Thank You', count: 198 },
        { gesture: 'Please', count: 156 },
      ],
    };
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
};

export const getDashboardStats = async () => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return dummy stats
    return {
      totalPredictions: 1247,
      avgConfidence: 94.2,
      accuracy: 97.8,
      activeSessions: 234,
      recentActivity: [
        { gesture: 'Hello', confidence: 98.5, timestamp: new Date().toISOString() },
        { gesture: 'Thank You', confidence: 95.2, timestamp: new Date(Date.now() - 300000).toISOString() },
      ],
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};
