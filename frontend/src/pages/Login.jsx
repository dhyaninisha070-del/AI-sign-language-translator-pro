import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiAlertCircle, FiGithub } from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';
import AuthShell from '../components/ui/AuthShell';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Frontend-only: Store login state in localStorage
   localStorage.setItem(
  'user',
  JSON.stringify({
    id: 1,
    name: 'Yamini Bisen', 
    email: formData.email,
    role: 'Frontend Developer',
  })
);

      navigate('/dashboard');
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to your account to continue">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="glass-card rounded-3xl p-6 shadow-glow sm:p-8"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 rounded-xl border border-danger/30 bg-danger/10 p-4 text-danger"
            >
              <FiAlertCircle size={18} />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="input-field pl-11"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="input-field pl-11 pr-11"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-text-secondary transition-colors hover:text-text"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-border bg-card text-primary focus:ring-primary focus:ring-offset-0"
              />
              <span className="text-sm text-text-secondary">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-primary transition-colors hover:text-primary/80">
              Forgot password?
            </Link>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.01 }}
            whileTap={{ scale: loading ? 1 : 0.99 }}
            className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-base font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <FiArrowRight size={18} />
              </>
            )}
          </motion.button>
        </form>

        <div className="relative my-7">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-card px-4 text-text-secondary">or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
            <motion.button
              type="button"
              onClick={() => {
                // Placeholder for social login
                console.log('Google login clicked');
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 rounded-xl border border-border glass-card-light py-3 text-sm font-medium transition-colors hover:border-primary/30"
            >
              <FaGoogle size={18} />
              <span>Google</span>
            </motion.button>
            <motion.button
              type="button"
              onClick={() => {
                // Placeholder for social login
                console.log('GitHub login clicked');
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 rounded-xl border border-border glass-card-light py-3 text-sm font-medium transition-colors hover:border-primary/30"
            >
              <FiGithub size={18} />
              <span>GitHub</span>
            </motion.button>
        </div>
      </motion.div>

      <p className="mt-8 text-center text-text-secondary">
        Don&apos;t have an account?{' '}
        <Link to="/signup" className="font-medium text-primary transition-colors hover:text-primary/80">
          Sign up for free
        </Link>
      </p>
    </AuthShell>
  );
};

export default Login;
