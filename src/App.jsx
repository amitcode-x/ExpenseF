import React, { useState, useEffect } from 'react';
import { Plus, Home, User, BarChart3, ArrowRight, Wallet, TrendingUp, TrendingDown, Filter, Edit2, Trash2, Calendar, DollarSign, Eye, EyeOff, Key, Mail, UserCheck, Download, FileText } from 'lucide-react';

const ExpenseTracker = () => {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [transactions, setTransactions] = useState([]); // Changed from expenses to transactions
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all'); // New filter for income/expense
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Load data from memory storage on component mount
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('expenseFlow_users') || '[]');
    const currentUserData = JSON.parse(localStorage.getItem('expenseFlow_currentUser') || 'null');
    const transactionsData = JSON.parse(localStorage.getItem('expenseFlow_transactions') || '[]');
    
    if (currentUserData) {
      setCurrentUser(currentUserData);
      setIsAuthenticated(true);
      setCurrentPage('dashboard');
      setTransactions(transactionsData.filter(trans => trans.userId === currentUserData.id));
    }
  }, []);

  // Save to memory storage
  const saveToStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const expenseCategories = [
    { id: 'food', name: 'Food', color: 'bg-orange-500', icon: '🍕' },
    { id: 'transport', name: 'Transport', color: 'bg-blue-500', icon: '🚗' },
    { id: 'entertainment', name: 'Entertainment', color: 'bg-purple-500', icon: '🎬' },
    { id: 'shopping', name: 'Shopping', color: 'bg-pink-500', icon: '🛍️' },
    { id: 'bills', name: 'Bills', color: 'bg-red-500', icon: '⚡' },
    { id: 'health', name: 'Health', color: 'bg-green-500', icon: '🏥' },
    { id: 'other', name: 'Other', color: 'bg-gray-500', icon: '📦' }
  ];

  const incomeCategories = [
    { id: 'salary', name: 'Salary', color: 'bg-emerald-500', icon: '💼' },
    { id: 'freelance', name: 'Freelance', color: 'bg-blue-500', icon: '💻' },
    { id: 'investment', name: 'Investment', color: 'bg-yellow-500', icon: '📈' },
    { id: 'business', name: 'Business', color: 'bg-purple-500', icon: '🏢' },
    { id: 'gift', name: 'Gift', color: 'bg-pink-500', icon: '🎁' },
    { id: 'bonus', name: 'Bonus', color: 'bg-orange-500', icon: '⭐' },
    { id: 'other-income', name: 'Other', color: 'bg-gray-500', icon: '💰' }
  ];

  // Enhanced Welcome Page with more animations
  const WelcomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full animate-pulse"></div>
        <div className="absolute top-1/4 -left-8 w-32 h-32 bg-pink-300/20 rounded-full animate-bounce-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-violet-300/20 rounded-full animate-pulse"></div>
      </div>
      
      <div className="text-center text-white animate-fade-in relative z-10">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center shadow-2xl animate-float">
            <Wallet className="w-16 h-16 text-white drop-shadow-lg" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-pink-200 to-violet-200 bg-clip-text text-transparent animate-gradient">
            ExpenseFlow
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-2">Track your income & expenses with style</p>
          <p className="text-md opacity-75">✨ Smart • Secure • Simple ✨</p>
        </div>
        <button
          onClick={() => setCurrentPage('intro')}
          className="group bg-white/20 backdrop-blur-lg hover:bg-white/30 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-white/30 relative overflow-hidden"
        >
          <span className="relative z-10">Get Started</span>
          <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
      </div>
    </div>
  );

  // Enhanced Intro Page
  const IntroPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10"></div>
      <div className="text-center text-white max-w-4xl animate-slide-up relative z-10">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <TrendingUp className="w-24 h-24 text-white/90 animate-pulse" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-ping"></div>
          </div>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Take Control of Your 
          <span className="bg-gradient-to-r from-pink-300 to-violet-300 bg-clip-text text-transparent"> Finances</span>
        </h2>
        <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed max-w-2xl mx-auto">
          Effortlessly track your income and expenses, categorize spending, and gain insights into your financial habits. Start your journey to financial freedom today.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold mb-2">Smart Categorization</h3>
            <p className="text-sm opacity-80">Organize income & expenses automatically</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="font-semibold mb-2">Real-time Analytics</h3>
            <p className="text-sm opacity-80">Visual insights into your cash flow</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-purple-400/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="font-semibold mb-2">Export & Backup</h3>
            <p className="text-sm opacity-80">Download your data as CSV anytime</p>
          </div>
        </div>
        
        <button
          onClick={() => setCurrentPage('auth')}
          className="group bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-12 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl relative overflow-hidden"
        >
          <span className="relative z-10">Let's Go</span>
          <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
      </div>
    </div>
  );

  // Enhanced Authentication Page with forgot password
  const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      name: '',
      username: ''
    });
    const [forgotEmail, setForgotEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const validateForm = () => {
      const newErrors = {};
      
      if (!isLogin) {
        if (!formData.name.trim()) {
          newErrors.name = 'Full name is required';
        }
        if (!formData.username.trim()) {
          newErrors.username = 'Username is required';
        } else if (formData.username.length < 3) {
          newErrors.username = 'Username must be at least 3 characters';
        } else {
          // Check username uniqueness
          const users = JSON.parse(localStorage.getItem('expenseFlow_users') || '[]');
          if (users.find(u => u.username.toLowerCase() === formData.username.toLowerCase())) {
            newErrors.username = 'Username already exists';
          }
        }
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      
      if (!formData.password.trim()) {
        newErrors.password = 'Password is required';
      } else if (!isLogin && formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      
      return newErrors;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const formErrors = validateForm();
      setErrors(formErrors);
      
      if (Object.keys(formErrors).length > 0) return;

      const users = JSON.parse(localStorage.getItem('expenseFlow_users') || '[]');

      if (isLogin) {
        // Login logic
        const user = users.find(u => 
          (u.email === formData.email || u.username === formData.email) && 
          u.password === formData.password
        );
        if (user) {
          setCurrentUser(user);
          setIsAuthenticated(true);
          saveToStorage('expenseFlow_currentUser', user);
          setCurrentPage('dashboard');
          setSuccessMessage('Welcome back! 🎉');
        } else {
          const userExists = users.find(u => u.email === formData.email || u.username === formData.email);
          if (!userExists) {
            setErrors({ email: 'No account found. Please register first.' });
            setTimeout(() => {
              setIsLogin(false);
              setErrors({});
            }, 2000);
          } else {
            setErrors({ password: 'Incorrect password' });
          }
        }
      } else {
        // Register logic
        if (users.find(u => u.email === formData.email)) {
          setErrors({ email: 'Email already exists' });
          return;
        }
        
        const newUser = {
          id: Date.now(),
          name: formData.name.trim(),
          username: formData.username.trim().toLowerCase(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          createdAt: new Date().toISOString()
        };
        
        const updatedUsers = [...users, newUser];
        saveToStorage('expenseFlow_users', updatedUsers);
        setCurrentUser(newUser);
        setIsAuthenticated(true);
        saveToStorage('expenseFlow_currentUser', newUser);
        setCurrentPage('dashboard');
        setSuccessMessage('Account created successfully! 🎉');
      }
    };

    const handleForgotPassword = (e) => {
      e.preventDefault();
      const users = JSON.parse(localStorage.getItem('expenseFlow_users') || '[]');
      const user = users.find(u => u.email === forgotEmail);
      
      if (user) {
        setSuccessMessage(`Password reset link sent to ${forgotEmail} 📧`);
        setTimeout(() => {
          setShowForgotPassword(false);
          setForgotEmail('');
          setSuccessMessage('');
        }, 3000);
      } else {
        setErrors({ email: 'No account found with this email' });
      }
    };

    if (showForgotPassword) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md border border-white/20 shadow-2xl">
            <div className="text-center mb-8">
              <Key className="w-16 h-16 mx-auto mb-4 text-white" />
              <h2 className="text-3xl font-bold text-white mb-2">Forgot Password?</h2>
              <p className="text-white/70">Enter your email to reset your password</p>
            </div>

            {successMessage && (
              <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-4 mb-6 text-center">
                <p className="text-green-200 font-medium">{successMessage}</p>
              </div>
            )}

            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                    required
                  />
                </div>
                {errors.email && <p className="text-red-300 text-sm mt-1">{errors.email}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                Send Reset Link
              </button>
            </form>

            <div className="text-center mt-6">
              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  setErrors({});
                  setForgotEmail('');
                }}
                className="text-white/70 hover:text-white transition-colors"
              >
                ← Back to login
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <Wallet className="w-16 h-16 mx-auto mb-4 text-white animate-pulse" />
            <h2 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-white/70">
              {isLogin ? 'Sign in to continue your journey' : 'Join ExpenseFlow family today'}
            </p>
          </div>

          {successMessage && (
            <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-4 mb-6 text-center">
              <p className="text-green-200 font-medium">{successMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <>
                <div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  {errors.name && <p className="text-red-300 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <div className="relative">
                    <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                    <input
                      type="text"
                      placeholder="Username *"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  {errors.username && <p className="text-red-300 text-sm mt-1">{errors.username}</p>}
                </div>
              </>
            )}
            
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  type="text"
                  placeholder={isLogin ? "Email or Username" : "Email Address *"}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                  required
                />
              </div>
              {errors.email && <p className="text-red-300 text-sm mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password *"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-300 text-sm mt-1">{errors.password}</p>}
            </div>

            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="text-center mt-6">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
                setFormData({email: '', password: '', name: '', username: ''});
                setSuccessMessage('');
              }}
              className="text-white/70 hover:text-white transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Add/Edit Transaction Modal
  const TransactionModal = () => {
    const [transactionData, setTransactionData] = useState({
      title: '',
      amount: '',
      type: 'expense', // 'income' or 'expense'
      category: 'food',
      date: new Date().toISOString().split('T')[0],
      note: ''
    });

    useEffect(() => {
      if (editingTransaction) {
        setTransactionData(editingTransaction);
      }
    }, [editingTransaction]);

    const handleSubmit = (e) => {
      e.preventDefault();
      const transaction = {
        ...transactionData,
        id: editingTransaction ? editingTransaction.id : Date.now(),
        userId: currentUser.id,
        amount: parseFloat(transactionData.amount),
        createdAt: editingTransaction ? editingTransaction.createdAt : new Date().toISOString()
      };

      let updatedTransactions;
      if (editingTransaction) {
        updatedTransactions = transactions.map(trans => trans.id === editingTransaction.id ? transaction : trans);
        setTransactions(updatedTransactions);
      } else {
        updatedTransactions = [...transactions, transaction];
        setTransactions(updatedTransactions);
      }
      
      // Save to storage
      const allTransactions = JSON.parse(localStorage.getItem('expenseFlow_transactions') || '[]');
      const otherUserTransactions = allTransactions.filter(trans => trans.userId !== currentUser.id);
      saveToStorage('expenseFlow_transactions', [...otherUserTransactions, ...updatedTransactions]);
      
      setShowAddTransaction(false);
      setEditingTransaction(null);
      setTransactionData({
        title: '',
        amount: '',
        type: 'expense',
        category: 'food',
        date: new Date().toISOString().split('T')[0],
        note: ''
      });
    };

    const currentCategories = transactionData.type === 'income' ? incomeCategories : expenseCategories;

    // Update category when type changes
    useEffect(() => {
      if (transactionData.type === 'income' && !incomeCategories.find(cat => cat.id === transactionData.category)) {
        setTransactionData(prev => ({ ...prev, category: 'salary' }));
      } else if (transactionData.type === 'expense' && !expenseCategories.find(cat => cat.id === transactionData.category)) {
        setTransactionData(prev => ({ ...prev, category: 'food' }));
      }
    }, [transactionData.type]);

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end md:items-center justify-center z-50 p-4">
        <div className="bg-white rounded-t-3xl md:rounded-3xl w-full md:w-96 max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                {editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
              </h3>
              <button
                onClick={() => {
                  setShowAddTransaction(false);
                  setEditingTransaction(null);
                }}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Transaction Type Toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Transaction Type *</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTransactionData({...transactionData, type: 'income'})}
                    className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                      transactionData.type === 'income'
                        ? 'border-green-400 bg-green-50 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <TrendingUp className={`w-8 h-8 mx-auto mb-2 ${transactionData.type === 'income' ? 'text-green-500' : 'text-gray-400'}`} />
                    <div className="text-sm font-medium text-gray-700">Income</div>
                    <div className="text-xs text-gray-500">Money in</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTransactionData({...transactionData, type: 'expense'})}
                    className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                      transactionData.type === 'expense'
                        ? 'border-red-400 bg-red-50 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <TrendingDown className={`w-8 h-8 mx-auto mb-2 ${transactionData.type === 'expense' ? 'text-red-500' : 'text-gray-400'}`} />
                    <div className="text-sm font-medium text-gray-700">Expense</div>
                    <div className="text-xs text-gray-500">Money out</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={transactionData.title}
                  onChange={(e) => setTransactionData({...transactionData, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                  placeholder="Enter transaction title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount *</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    step="0.01"
                    value={transactionData.amount}
                    onChange={(e) => setTransactionData({...transactionData, amount: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {transactionData.type === 'income' ? 'Income Category *' : 'Expense Category *'}
                </label>
                <div className="grid grid-cols-3 gap-3 max-h-48 overflow-y-auto">
                  {currentCategories.map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setTransactionData({...transactionData, category: cat.id})}
                      className={`p-3 rounded-xl border-2 transition-all transform hover:scale-105 ${
                        transactionData.category === cat.id
                          ? 'border-purple-400 bg-purple-50 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{cat.icon}</div>
                      <div className="text-xs font-medium text-gray-700">{cat.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={transactionData.date}
                    onChange={(e) => setTransactionData({...transactionData, date: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Note (Optional)</label>
                <textarea
                  value={transactionData.note}
                  onChange={(e) => setTransactionData({...transactionData, note: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none transition-all"
                  rows="3"
                  placeholder="Add a note..."
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-xl font-semibold transition-all transform hover:scale-105 hover:shadow-xl text-white ${
                  transactionData.type === 'income' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                    : 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600'
                }`}
              >
                {editingTransaction ? 'Update Transaction' : `Add ${transactionData.type === 'income' ? 'Income' : 'Expense'}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // CSV Export Function
  const exportToCSV = () => {
    if (transactions.length === 0) {
      alert('No transactions to export!');
      return;
    }

    const headers = ['Date', 'Type', 'Title', 'Category', 'Amount', 'Note'];
    const csvData = transactions.map(transaction => {
      const category = transaction.type === 'income' 
        ? incomeCategories.find(cat => cat.id === transaction.category)
        : expenseCategories.find(cat => cat.id === transaction.category);
      
      return [
        transaction.date,
        transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1),
        transaction.title,
        category?.name || transaction.category,
        transaction.amount.toFixed(2),
        transaction.note || ''
      ];
    });

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `ExpenseFlow_${currentUser.username}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Dashboard Component (enhanced with income/expense tracking)
  const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('home');

    const filteredTransactions = transactions.filter(trans => {
      const categoryMatch = selectedCategory === 'all' || trans.category === selectedCategory;
      const typeMatch = selectedType === 'all' || trans.type === selectedType;
      return categoryMatch && typeMatch;
    });

    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const netBalance = totalIncome - totalExpenses;

    const getCategoryData = () => {
      const categoryTotals = {};
      transactions.forEach(trans => {
        const key = `${trans.type}-${trans.category}`;
        categoryTotals[key] = (categoryTotals[key] || 0) + trans.amount;
      });
      
      return Object.entries(categoryTotals).map(([key, total]) => {
        const [type, categoryId] = key.split('-');
        const categories = type === 'income' ? incomeCategories : expenseCategories;
        const category = categories.find(cat => cat.id === categoryId);
        return {
          ...category,
          total,
          type
        };
      });
    };

    const deleteTransaction = (id) => {
      const updatedTransactions = transactions.filter(trans => trans.id !== id);
      setTransactions(updatedTransactions);
      
      // Update storage
      const allTransactions = JSON.parse(localStorage.getItem('expenseFlow_transactions') || '[]');
      const otherUserTransactions = allTransactions.filter(trans => trans.userId !== currentUser.id);
      saveToStorage('expenseFlow_transactions', [...otherUserTransactions, ...updatedTransactions]);
    };

    // Get monthly data for better analytics
    const getMonthlyData = () => {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      
      const thisMonthTransactions = transactions.filter(trans => {
        const transDate = new Date(trans.date);
        return transDate.getMonth() === currentMonth && transDate.getFullYear() === currentYear;
      });
      
      const lastMonthTransactions = transactions.filter(trans => {
        const transDate = new Date(trans.date);
        const lastMonthDate = new Date(currentYear, currentMonth - 1);
        return transDate.getMonth() === lastMonthDate.getMonth() && transDate.getFullYear() === lastMonthDate.getFullYear();
      });
      
      const thisMonthIncome = thisMonthTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
      const thisMonthExpenses = thisMonthTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
      const lastMonthIncome = lastMonthTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
      const lastMonthExpenses = lastMonthTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
      
      return {
        thisMonth: { income: thisMonthIncome, expenses: thisMonthExpenses, net: thisMonthIncome - thisMonthExpenses },
        lastMonth: { income: lastMonthIncome, expenses: lastMonthExpenses, net: lastMonthIncome - lastMonthExpenses },
        count: thisMonthTransactions.length
      };
    };

    const monthlyData = getMonthlyData();

    const HomeTab = () => (
      <div className="space-y-6">
        {/* Enhanced Header with balance */}
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 animate-pulse"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg opacity-90 mb-1">Hello, {currentUser?.name} 👋</h2>
                <p className="text-2xl font-bold">Your Financial Dashboard</p>
                <p className="text-sm opacity-80 mt-1">@{currentUser?.username}</p>
              </div>
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                <Wallet className="w-7 h-7" />
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 border border-white/30">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm opacity-90">Net Balance</p>
                <span className={`text-xs px-2 py-1 rounded-full ${netBalance >= 0 ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'}`}>
                  {netBalance >= 0 ? '💰' : '⚠️'} {netBalance >= 0 ? 'Positive' : 'Negative'}
                </span>
              </div>
              <p className={`text-4xl font-bold mb-1 ${netBalance >= 0 ? 'text-green-200' : 'text-red-200'}`}>
                ${Math.abs(netBalance).toFixed(2)}
              </p>
              <div className="flex justify-between text-sm opacity-80">
                <span>Income: ${totalIncome.toFixed(2)}</span>
                <span>Expenses: ${totalExpenses.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Income</p>
                <p className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</p>
                <p className="text-xs text-gray-500">{transactions.filter(t => t.type === 'income').length} transactions</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</p>
                <p className="text-xs text-gray-500">{transactions.filter(t => t.type === 'expense').length} transactions</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Type and Category Filter */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Filter Transactions</h3>
            <button
              onClick={exportToCSV}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition-all transform hover:scale-105 shadow-lg"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
          
          {/* Type Filter */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Transaction Type</p>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-5 py-3 rounded-full whitespace-nowrap text-sm font-medium transition-all transform hover:scale-105 ${
                  selectedType === 'all'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🌟 All Types
              </button>
              <button
                onClick={() => setSelectedType('income')}
                className={`px-5 py-3 rounded-full whitespace-nowrap text-sm font-medium transition-all transform hover:scale-105 ${
                  selectedType === 'income'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                💰 Income
              </button>
              <button
                onClick={() => setSelectedType('expense')}
                className={`px-5 py-3 rounded-full whitespace-nowrap text-sm font-medium transition-all transform hover:scale-105 ${
                  selectedType === 'expense'
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                💸 Expenses
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Categories</p>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-5 py-3 rounded-full whitespace-nowrap text-sm font-medium transition-all transform hover:scale-105 ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ✨ All Categories
              </button>
              {(selectedType === 'all' ? [...expenseCategories, ...incomeCategories] : 
                selectedType === 'income' ? incomeCategories : expenseCategories)
                .map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-3 rounded-full whitespace-nowrap text-sm font-medium transition-all transform hover:scale-105 ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Recent Transactions</h3>
            <span className="text-sm text-gray-500">{filteredTransactions.length} items</span>
          </div>
          <div className="space-y-4">
            {filteredTransactions.slice(-10).reverse().map(transaction => {
              const categories = transaction.type === 'income' ? incomeCategories : expenseCategories;
              const category = categories.find(cat => cat.id === transaction.category);
              return (
                <div key={transaction.id} className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all transform hover:scale-102">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-14 h-14 ${category?.color || 'bg-gray-500'} rounded-xl flex items-center justify-center text-white text-xl shadow-lg relative`}>
                        {category?.icon || '💼'}
                        <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-lg">{transaction.title}</h4>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            transaction.type === 'income' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {transaction.type === 'income' ? 'Income' : 'Expense'}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(transaction.date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                        {transaction.note && (
                          <p className="text-xs text-gray-400 mt-1 truncate max-w-40">{transaction.note}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <span className={`text-xl font-bold ${
                          transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                        </span>
                        <p className="text-xs text-gray-500">{category?.name || transaction.category}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEditingTransaction(transaction);
                            setShowAddTransaction(true);
                          }}
                          className="w-9 h-9 bg-blue-100 hover:bg-blue-200 rounded-lg flex items-center justify-center transition-all transform hover:scale-110"
                        >
                          <Edit2 className="w-4 h-4 text-blue-600" />
                        </button>
                        <button
                          onClick={() => deleteTransaction(transaction.id)}
                          className="w-9 h-9 bg-red-100 hover:bg-red-200 rounded-lg flex items-center justify-center transition-all transform hover:scale-110"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {filteredTransactions.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No transactions found</h3>
                <p className="text-gray-500 mb-4">Start by adding your first transaction</p>
                <button
                  onClick={() => setShowAddTransaction(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
                >
                  Add Transaction
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );

    const StatsTab = () => (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-pink-600/20 animate-pulse"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Financial Analytics 📊</h2>
            <p className="opacity-90">Your income, expenses, and financial insights</p>
          </div>
        </div>

        {/* Enhanced Financial Overview */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Financial Overview</h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Total Income</p>
              <p className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl">
              <TrendingDown className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
              <Wallet className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Net Balance</p>
              <p className={`text-2xl font-bold ${netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${Math.abs(netBalance).toFixed(2)}
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-medium ${
              netBalance >= 0 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {netBalance >= 0 ? '💰 Positive Cash Flow' : '⚠️ Negative Cash Flow'}
            </span>
          </div>
        </div>

        {/* Monthly Comparison */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Monthly Comparison</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">This Month</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-green-700 font-medium">Income</span>
                  <span className="font-bold text-green-600">${monthlyData.thisMonth.income.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="text-red-700 font-medium">Expenses</span>
                  <span className="font-bold text-red-600">${monthlyData.thisMonth.expenses.toFixed(2)}</span>
                </div>
                <div className={`flex justify-between items-center p-3 rounded-lg ${
                  monthlyData.thisMonth.net >= 0 ? 'bg-blue-50' : 'bg-orange-50'
                }`}>
                  <span className={`font-medium ${monthlyData.thisMonth.net >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>
                    Net
                  </span>
                  <span className={`font-bold ${monthlyData.thisMonth.net >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                    ${Math.abs(monthlyData.thisMonth.net).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Last Month</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-green-700 font-medium">Income</span>
                  <span className="font-bold text-green-600">${monthlyData.lastMonth.income.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="text-red-700 font-medium">Expenses</span>
                  <span className="font-bold text-red-600">${monthlyData.lastMonth.expenses.toFixed(2)}</span>
                </div>
                <div className={`flex justify-between items-center p-3 rounded-lg ${
                  monthlyData.lastMonth.net >= 0 ? 'bg-blue-50' : 'bg-orange-50'
                }`}>
                  <span className={`font-medium ${monthlyData.lastMonth.net >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>
                    Net
                  </span>
                  <span className={`font-bold ${monthlyData.lastMonth.net >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                    ${Math.abs(monthlyData.lastMonth.net).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Category Breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Category Breakdown</h3>
          
          {/* Income Categories */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Income Categories
            </h4>
            <div className="space-y-4">
              {getCategoryData()
                .filter(cat => cat.type === 'income')
                .sort((a, b) => b.total - a.total)
                .map(category => {
                  const percentage = totalIncome > 0 ? (category.total / totalIncome) * 100 : 0;
                  return (
                    <div key={`${category.type}-${category.id}`} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center text-white shadow-md`}>
                            {category.icon}
                          </div>
                          <div>
                            <span className="font-semibold text-gray-800">{category.name}</span>
                            <p className="text-sm text-green-600">{percentage.toFixed(1)}% of income</p>
                          </div>
                        </div>
                        <span className="font-bold text-green-600 text-lg">${category.total.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-green-100 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500 shadow-sm"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Expense Categories */}
          <div>
            <h4 className="text-lg font-semibold text-red-700 mb-4 flex items-center">
              <TrendingDown className="w-5 h-5 mr-2" />
              Expense Categories
            </h4>
            <div className="space-y-4">
              {getCategoryData()
                .filter(cat => cat.type === 'expense')
                .sort((a, b) => b.total - a.total)
                .map(category => {
                  const percentage = totalExpenses > 0 ? (category.total / totalExpenses) * 100 : 0;
                  return (
                    <div key={`${category.type}-${category.id}`} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center text-white shadow-md`}>
                            {category.icon}
                          </div>
                          <div>
                            <span className="font-semibold text-gray-800">{category.name}</span>
                            <p className="text-sm text-red-600">{percentage.toFixed(1)}% of expenses</p>
                          </div>
                        </div>
                        <span className="font-bold text-red-600 text-lg">${category.total.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-red-100 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-3 rounded-full bg-gradient-to-r from-red-400 to-pink-500 transition-all duration-500 shadow-sm"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Enhanced Financial Insights */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Financial Insights 💡</h3>
          <div className="space-y-3">
            {transactions.length > 0 && (
              <>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">Average transaction</span>
                  <span className="font-semibold text-blue-600">
                    ${(transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700">Savings rate</span>
                  <span className="font-semibold text-green-600">
                    {totalIncome > 0 ? ((netBalance / totalIncome) * 100).toFixed(1) : 0}%
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700">Total transactions</span>
                  <span className="font-semibold text-purple-600">{transactions.length}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-gray-700">Most active month</span>
                  <span className="font-semibold text-orange-600">Current period</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );

    const ProfileTab = () => (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-indigo-600/20 animate-pulse"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                <User className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">{currentUser?.name}</h2>
                <p className="opacity-90 text-lg">@{currentUser?.username}</p>
                <p className="opacity-75">{currentUser?.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Account Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Account Summary</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-gray-600 mb-1">Income Entries</p>
              <p className="text-xl font-bold text-green-600">{transactions.filter(t => t.type === 'income').length}</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-gray-600 mb-1">Expense Entries</p>
              <p className="text-xl font-bold text-red-600">{transactions.filter(t => t.type === 'expense').length}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-700 font-medium">Member since</span>
              <span className="font-semibold text-gray-800">
                {new Date(currentUser?.createdAt).toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <span className="text-gray-700 font-medium">Total Income</span>
              <span className="font-bold text-green-600 text-lg">${totalIncome.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
              <span className="text-gray-700 font-medium">Total Expenses</span>
              <span className="font-bold text-red-600 text-lg">${totalExpenses.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <span className="text-gray-700 font-medium">Net Balance</span>
              <span className={`font-bold text-lg ${netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${Math.abs(netBalance).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
              <span className="text-gray-700 font-medium">Average Transaction</span>
              <span className="font-semibold text-purple-600">
                ${transactions.length > 0 ? (transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length).toFixed(2) : '0.00'}
              </span>
            </div>
          </div>
        </div>

        {/* Data Export Section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Data Export</h3>
          <p className="text-gray-600 mb-4">Download your financial data for backup or analysis in other tools.</p>
          <button
            onClick={exportToCSV}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 rounded-xl font-semibold transition-all transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>Download CSV Report</span>
          </button>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Includes all your transactions with categories and dates
          </p>
        </div>

        {/* Account Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Account Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => {
                const confirmDelete = window.confirm('Are you sure you want to delete all your data? This action cannot be undone.');
                if (confirmDelete) {
                  // Clear user data
                  const allUsers = JSON.parse(localStorage.getItem('expenseFlow_users') || '[]');
                  const otherUsers = allUsers.filter(u => u.id !== currentUser.id);
                  saveToStorage('expenseFlow_users', otherUsers);
                  
                  const allTransactions = JSON.parse(localStorage.getItem('expenseFlow_transactions') || '[]');
                  const otherUserTransactions = allTransactions.filter(trans => trans.userId !== currentUser.id);
                  saveToStorage('expenseFlow_transactions', otherUserTransactions);
                  
                  localStorage.removeItem('expenseFlow_currentUser');
                  
                  // Sign out
                  setIsAuthenticated(false);
                  setCurrentUser(null);
                  setCurrentPage('welcome');
                  setTransactions([]);
                }
              }}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-all transform hover:scale-105"
            >
              🗑️ Delete All Data
            </button>
            
            <button
              onClick={() => {
                localStorage.removeItem('expenseFlow_currentUser');
                setIsAuthenticated(false);
                setCurrentUser(null);
                setCurrentPage('welcome');
                setTransactions([]);
              }}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition-all transform hover:scale-105"
            >
              🚪 Sign Out
            </button>
          </div>
        </div>
      </div>
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Desktop Header */}
        <div className="hidden md:block bg-white shadow-lg border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ExpenseFlow
                </h1>
                <p className="text-sm text-gray-500">Smart financial tracking</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Net Balance</p>
                <p className={`font-bold ${netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${Math.abs(netBalance).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => setShowAddTransaction(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all flex items-center space-x-2 shadow-lg transform hover:scale-105"
              >
                <Plus className="w-5 h-5" />
                <span>Add Transaction</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 pb-24 md:pb-6">
          <div className="md:grid md:grid-cols-4 md:gap-6">
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200 sticky top-24">
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('home')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all transform hover:scale-105 ${
                      activeTab === 'home'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Home className="w-5 h-5" />
                    <span>Home</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('stats')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all transform hover:scale-105 ${
                      activeTab === 'stats'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span>Analytics</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all transform hover:scale-105 ${
                      activeTab === 'profile'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              {activeTab === 'home' && <HomeTab />}
              {activeTab === 'stats' && <StatsTab />}
              {activeTab === 'profile' && <ProfileTab />}
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 px-4 py-3 shadow-2xl">
          <div className="flex justify-around items-center">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all transform hover:scale-110 ${
                activeTab === 'home' ? 'text-purple-500' : 'text-gray-500'
              }`}
            >
              <Home className="w-6 h-6" />
              <span className="text-xs font-medium">Home</span>
            </button>
            
            <button
              onClick={() => setShowAddTransaction(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-xl transform hover:scale-110 transition-all"
            >
              <Plus className="w-6 h-6" />
            </button>
            
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all transform hover:scale-110 ${
                activeTab === 'stats' ? 'text-purple-500' : 'text-gray-500'
              }`}
            >
              <BarChart3 className="w-6 h-6" />
              <span className="text-xs font-medium">Stats</span>
            </button>
            
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all transform hover:scale-110 ${
                activeTab === 'profile' ? 'text-purple-500' : 'text-gray-500'
              }`}
            >
              <User className="w-6 h-6" />
              <span className="text-xs font-medium">Profile</span>
            </button>
          </div>
        </div>

        {/* Add/Edit Transaction Modal */}
        {(showAddTransaction || editingTransaction) && <TransactionModal />}
      </div>
    );
  };

  // Enhanced CSS Animation Styles (same as before)
  const styles = `
    <style>
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes slide-up {
        from { opacity: 0; transform: translateY(40px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      
      @keyframes bounce-slow {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }
      
      @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      .animate-fade-in {
        animation: fade-in 1s ease-out;
      }
      
      .animate-slide-up {
        animation: slide-up 0.8s ease-out;
      }
      
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
      
      .animate-bounce-slow {
        animation: bounce-slow 4s ease-in-out infinite;
      }
      
      .animate-gradient {
        background-size: 200% 200%;
        animation: gradient 3s ease infinite;
      }
      
      /* Enhanced transitions */
      * {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      /* Custom scrollbar */
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      
      ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      
      ::-webkit-scrollbar-track {
        background: #f3f4f6;
        border-radius: 10px;
      }
      
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(45deg, #8b5cf6, #ec4899);
        border-radius: 10px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(45deg, #7c3aed, #db2777);
      }
      
      /* Grid pattern background */
      .bg-grid-white\/10 {
        background-image: url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23ffffff' fill-opacity='0.1'%3e%3ccircle cx='7' cy='7' r='1'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e");
      }
      
      /* Glassmorphism effects */
      .backdrop-blur-lg {
        backdrop-filter: blur(16px);
      }
      
      .backdrop-blur-sm {
        backdrop-filter: blur(4px);
      }
      
      /* Hover scale animations */
      .hover\:scale-102:hover {
        transform: scale(1.02);
      }
      
      .hover\:scale-105:hover {
        transform: scale(1.05);
      }
      
      .hover\:scale-110:hover {
        transform: scale(1.1);
      }
    </style>
  `;

  // Main render logic
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="font-sans antialiased">
        {currentPage === 'welcome' && <WelcomePage />}
        {currentPage === 'intro' && <IntroPage />}
        {currentPage === 'auth' && <AuthPage />}
        {currentPage === 'dashboard' && isAuthenticated && <Dashboard />}
      </div>
    </>
  );
};

export default ExpenseTracker;