import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { BrandLogo } from '../components/common/BrandLogo';

type AuthMode = 'signin' | 'register';

export const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const navigate = useNavigate();

  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateSignIn = () => {
    const newErrors: Record<string, string> = {};
    if (!signInData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signInData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!signInData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegister = () => {
    const newErrors: Record<string, string> = {};
    if (!registerData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!registerData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!registerData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!registerData.password) {
      newErrors.password = 'Password is required';
    } else if (registerData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!registerData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!registerData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignIn()) return;
    
    setIsSubmitting(true);
    setMessage(null);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setMessage({ type: 'success', text: 'Demo: Sign in successful! (No real authentication)' });
      setTimeout(() => {
        navigate('/account');
      }, 1500);
    }, 1000);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRegister()) return;
    
    setIsSubmitting(true);
    setMessage(null);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setMessage({ type: 'success', text: 'Demo: Account created successfully! (No real account created)' });
      setTimeout(() => {
        setMode('signin');
        setMessage({ type: 'success', text: 'Please sign in with your new account.' });
      }, 1500);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-surface-base flex flex-col">
      {/* Header */}
      <header className="bg-surface-card border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <BrandLogo />
            <Link to="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-surface-card rounded-2xl border border-border-subtle shadow-lg overflow-hidden">
            {/* Tab Header */}
            <div className="flex border-b border-border-subtle">
              <button
                onClick={() => { setMode('signin'); setErrors({}); setMessage(null); }}
                className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                  mode === 'signin'
                    ? 'text-primary border-b-2 border-primary bg-teal-wash/50'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-warm'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setMode('register'); setErrors({}); setMessage(null); }}
                className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                  mode === 'register'
                    ? 'text-primary border-b-2 border-primary bg-teal-wash/50'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-warm'
                }`}
              >
                Create Account
              </button>
            </div>

            <div className="p-8">
              {/* Message */}
              {message && (
                <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${
                  message.type === 'success' 
                    ? 'bg-status-confirmed-bg border border-status-confirmed-text/20' 
                    : 'bg-status-rejected-bg border border-status-rejected-text/20'
                }`}>
                  {message.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-status-confirmed-text shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-status-rejected-text shrink-0 mt-0.5" />
                  )}
                  <p className={`text-sm ${message.type === 'success' ? 'text-status-confirmed-text' : 'text-status-rejected-text'}`}>
                    {message.text}
                  </p>
                </div>
              )}

              {/* Sign In Form */}
              {mode === 'signin' && (
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                      <input
                        type="email"
                        value={signInData.email}
                        onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${errors.email ? 'border-red-500' : 'border-border-subtle'} focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary`}
                        placeholder="you@example.com"
                      />
                    </div>
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={signInData.password}
                        onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                        className={`w-full pl-10 pr-12 py-2.5 rounded-xl border ${errors.password ? 'border-red-500' : 'border-border-subtle'} focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary`}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={signInData.rememberMe}
                        onChange={(e) => setSignInData({ ...signInData, rememberMe: e.target.checked })}
                        className="w-4 h-4 text-primary border-border-subtle rounded focus:ring-primary"
                      />
                      <span className="text-sm text-text-secondary">Remember me</span>
                    </label>
                    <button type="button" className="text-sm text-primary hover:text-teal-deep font-medium">
                      Forgot password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-primary hover:bg-teal-deep text-white font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <span>Sign In</span>
                    )}
                  </button>
                </form>
              )}

              {/* Register Form */}
              {mode === 'register' && (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">First Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                        <input
                          type="text"
                          value={registerData.firstName}
                          onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${errors.firstName ? 'border-red-500' : 'border-border-subtle'} focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary`}
                          placeholder="John"
                        />
                      </div>
                      {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Last Name</label>
                      <input
                        type="text"
                        value={registerData.lastName}
                        onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.lastName ? 'border-red-500' : 'border-border-subtle'} focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary`}
                        placeholder="Doe"
                      />
                      {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                      <input
                        type="email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${errors.email ? 'border-red-500' : 'border-border-subtle'} focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary`}
                        placeholder="you@example.com"
                      />
                    </div>
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        className={`w-full pl-10 pr-12 py-2.5 rounded-xl border ${errors.password ? 'border-red-500' : 'border-border-subtle'} focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary`}
                        placeholder="Min. 8 characters"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        className={`w-full pl-10 pr-12 py-2.5 rounded-xl border ${errors.confirmPassword ? 'border-red-500' : 'border-border-subtle'} focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary`}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
                  </div>

                  <div>
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={registerData.agreeToTerms}
                        onChange={(e) => setRegisterData({ ...registerData, agreeToTerms: e.target.checked })}
                        className="w-4 h-4 text-primary border-border-subtle rounded focus:ring-primary mt-0.5"
                      />
                      <span className="text-sm text-text-secondary">
                        I agree to the{' '}
                        <button type="button" className="text-primary hover:text-teal-deep">Terms of Service</button>
                        {' '}and{' '}
                        <button type="button" className="text-primary hover:text-teal-deep">Privacy Policy</button>
                      </span>
                    </label>
                    {errors.agreeToTerms && <p className="text-xs text-red-500 mt-1">{errors.agreeToTerms}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-primary hover:bg-teal-deep text-white font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Creating account...</span>
                      </>
                    ) : (
                      <span>Create Account</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          <p className="text-center text-sm text-text-muted mt-6">
            This is a demo. No real authentication or data storage.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;
