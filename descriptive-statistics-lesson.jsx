import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calculator, Table2, BarChart3, TrendingUp, Database, Play, ChevronRight, ChevronLeft, Check } from 'lucide-react';

const DescriptiveStatisticsLesson = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState([]);
  const [userDataset, setUserDataset] = useState('12, 15, 18, 20, 22, 25, 28, 30, 32, 35');
  const [calculatedStats, setCalculatedStats] = useState(null);
  const [activeTab, setActiveTab] = useState('frequency');

  // Sample datasets for examples
  const studentScores = [65, 72, 78, 82, 85, 88, 90, 92, 95, 98, 100, 75, 80, 85, 88, 90, 93, 96];
  const salesData = [
    { month: 'Jan', sales: 45 },
    { month: 'Feb', sales: 52 },
    { month: 'Mar', sales: 48 },
    { month: 'Apr', sales: 61 },
    { month: 'May', sales: 55 },
    { month: 'Jun', sales: 67 }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const sections = [
    { id: 0, title: 'Introduction', icon: <Database className="w-5 h-5" /> },
    { id: 1, title: 'Data Preparation', icon: <Table2 className="w-5 h-5" /> },
    { id: 2, title: 'Data Presentation', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 3, title: 'Central Tendency', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 4, title: 'Dispersion', icon: <Calculator className="w-5 h-5" /> },
    { id: 5, title: 'Statistical Software', icon: <Play className="w-5 h-5" /> }
  ];

  const calculateStatistics = (dataString) => {
    const data = dataString.split(',').map(x => parseFloat(x.trim())).filter(x => !isNaN(x));
    
    if (data.length === 0) return null;
    
    const sorted = [...data].sort((a, b) => a - b);
    const n = data.length;
    
    // Mean
    const mean = data.reduce((sum, val) => sum + val, 0) / n;
    
    // Median
    const median = n % 2 === 0 
      ? (sorted[n/2 - 1] + sorted[n/2]) / 2 
      : sorted[Math.floor(n/2)];
    
    // Mode
    const frequency = {};
    data.forEach(val => frequency[val] = (frequency[val] || 0) + 1);
    const maxFreq = Math.max(...Object.values(frequency));
    const mode = Object.keys(frequency).filter(key => frequency[key] === maxFreq).map(Number);
    
    // Range
    const range = sorted[n-1] - sorted[0];
    
    // Variance and Standard Deviation
    const variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);
    
    // Quartiles
    const q1 = sorted[Math.floor(n * 0.25)];
    const q3 = sorted[Math.floor(n * 0.75)];
    const iqr = q3 - q1;
    
    return {
      data: sorted,
      n,
      mean: mean.toFixed(2),
      median: median.toFixed(2),
      mode: mode.length === n ? 'No mode' : mode.join(', '),
      range: range.toFixed(2),
      variance: variance.toFixed(2),
      stdDev: stdDev.toFixed(2),
      q1: q1.toFixed(2),
      q3: q3.toFixed(2),
      iqr: iqr.toFixed(2),
      min: sorted[0],
      max: sorted[n-1]
    };
  };

  const handleCalculate = () => {
    const stats = calculateStatistics(userDataset);
    setCalculatedStats(stats);
  };

  const markComplete = (sectionId) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId]);
    }
  };

  const IntroSection = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Introduction to Descriptive Statistics</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
        <h3 className="text-xl font-semibold text-blue-900 mb-3">What is Descriptive Statistics?</h3>
        <p className="text-gray-700 leading-relaxed">
          Descriptive statistics involves methods for organizing, summarizing, and presenting data in an 
          informative way. It helps us understand the main features of a dataset without making conclusions 
          beyond the data we have analyzed.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
            Key Purposes
          </h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              Summarize large amounts of data concisely
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              Identify patterns and trends
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              Make data easier to understand and communicate
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              Provide foundation for further analysis
            </li>
          </ul>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
            Main Components
          </h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <strong>Data Preparation:</strong> Cleaning and organizing
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <strong>Data Presentation:</strong> Tables and graphs
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <strong>Central Tendency:</strong> Mean, median, mode
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <strong>Dispersion:</strong> Range, variance, standard deviation
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">Interactive Learning Path</h4>
        <p className="text-gray-700 mb-4">
          This lesson will guide you through each component with interactive examples, practice problems, 
          and a built-in statistical calculator. Complete each section to master descriptive statistics!
        </p>
        <button 
          onClick={() => { setCurrentSection(1); markComplete(0); }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all flex items-center"
        >
          Start Learning <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );

  const DataPreparationSection = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Data Preparation</h2>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
        <h3 className="text-xl font-semibold text-yellow-900 mb-3">Why Prepare Data?</h3>
        <p className="text-gray-700">
          Raw data often contains errors, missing values, or inconsistencies. Proper data preparation 
          ensures accurate analysis and reliable results.
        </p>
      </div>

      <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">Steps in Data Preparation</h4>
        
        <div className="space-y-4">
          <div className="border-l-4 border-blue-400 pl-4 py-2">
            <h5 className="font-semibold text-gray-800">1. Data Collection</h5>
            <p className="text-gray-600 text-sm mt-1">
              Gather data from reliable sources through surveys, experiments, or existing databases.
            </p>
            <div className="bg-gray-50 p-3 mt-2 rounded font-mono text-sm">
              Example: Student test scores from a class of 30 students
            </div>
          </div>

          <div className="border-l-4 border-green-400 pl-4 py-2">
            <h5 className="font-semibold text-gray-800">2. Data Cleaning</h5>
            <p className="text-gray-600 text-sm mt-1">
              Remove duplicates, handle missing values, and correct errors.
            </p>
            <div className="bg-gray-50 p-3 mt-2 rounded">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-red-600 font-semibold">Before:</span>
                  <div className="font-mono mt-1">85, 90, NA, 78, 85, 92</div>
                </div>
                <div>
                  <span className="text-green-600 font-semibold">After:</span>
                  <div className="font-mono mt-1">85, 90, 78, 85, 92</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-purple-400 pl-4 py-2">
            <h5 className="font-semibold text-gray-800">3. Data Organization</h5>
            <p className="text-gray-600 text-sm mt-1">
              Structure data in a logical format (spreadsheet, database, array).
            </p>
            <div className="bg-gray-50 p-3 mt-2 rounded overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left">Student ID</th>
                    <th className="px-4 py-2 text-left">Score</th>
                    <th className="px-4 py-2 text-left">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-2">001</td>
                    <td className="px-4 py-2">85</td>
                    <td className="px-4 py-2">B</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2">002</td>
                    <td className="px-4 py-2">92</td>
                    <td className="px-4 py-2">A</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">003</td>
                    <td className="px-4 py-2">78</td>
                    <td className="px-4 py-2">C</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-l-4 border-red-400 pl-4 py-2">
            <h5 className="font-semibold text-gray-800">4. Data Sorting</h5>
            <p className="text-gray-600 text-sm mt-1">
              Arrange data in ascending or descending order for easier analysis.
            </p>
            <div className="bg-gray-50 p-3 mt-2 rounded font-mono text-sm">
              Unsorted: 92, 78, 85, 90, 88 → Sorted: 78, 85, 88, 90, 92
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
        <h4 className="font-semibold text-green-900 mb-2 flex items-center">
          <Check className="w-5 h-5 mr-2" />
          Key Takeaways
        </h4>
        <ul className="text-gray-700 space-y-1 text-sm">
          <li>• Clean data = accurate results</li>
          <li>• Always check for outliers and errors</li>
          <li>• Document any changes made to the original data</li>
          <li>• Proper organization saves time in analysis</li>
        </ul>
      </div>

      <button 
        onClick={() => markComplete(1)}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all flex items-center"
      >
        Mark Complete <Check className="w-5 h-5 ml-2" />
      </button>
    </div>
  );

  const DataPresentationSection = () => {
    const frequencyData = [
      { range: '60-69', frequency: 2 },
      { range: '70-79', frequency: 4 },
      { range: '80-89', frequency: 6 },
      { range: '90-99', frequency: 5 },
      { range: '100', frequency: 1 }
    ];

    const categoryData = [
      { name: 'A', value: 5 },
      { name: 'B', value: 8 },
      { name: 'C', value: 3 },
      { name: 'D', value: 2 }
    ];

    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Data Presentation</h2>
        
        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg">
          <h3 className="text-xl font-semibold text-indigo-900 mb-3">Visual Communication</h3>
          <p className="text-gray-700">
            Presenting data effectively makes patterns visible and insights accessible. Both tabular and 
            graphical methods have their place in statistical analysis.
          </p>
        </div>

        <div className="flex space-x-2 border-b-2 border-gray-200">
          <button 
            onClick={() => setActiveTab('frequency')}
            className={`px-6 py-3 font-semibold transition-all ${activeTab === 'frequency' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
          >
            Frequency Tables
          </button>
          <button 
            onClick={() => setActiveTab('charts')}
            className={`px-6 py-3 font-semibold transition-all ${activeTab === 'charts' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
          >
            Charts & Graphs
          </button>
        </div>

        {activeTab === 'frequency' && (
          <div className="space-y-4">
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Frequency Distribution Table</h4>
              <p className="text-gray-600 mb-4">
                Shows how often each value or range of values occurs in a dataset.
              </p>
              
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border-2 border-gray-300">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="border border-gray-300 px-6 py-3 text-left">Score Range</th>
                      <th className="border border-gray-300 px-6 py-3 text-left">Frequency</th>
                      <th className="border border-gray-300 px-6 py-3 text-left">Relative Frequency</th>
                      <th className="border border-gray-300 px-6 py-3 text-left">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {frequencyData.map((row, idx) => {
                      const total = frequencyData.reduce((sum, r) => sum + r.frequency, 0);
                      const relFreq = (row.frequency / total).toFixed(3);
                      const percentage = ((row.frequency / total) * 100).toFixed(1);
                      
                      return (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="border border-gray-300 px-6 py-3 font-semibold">{row.range}</td>
                          <td className="border border-gray-300 px-6 py-3">{row.frequency}</td>
                          <td className="border border-gray-300 px-6 py-3">{relFreq}</td>
                          <td className="border border-gray-300 px-6 py-3">{percentage}%</td>
                        </tr>
                      );
                    })}
                    <tr className="bg-blue-100 font-bold">
                      <td className="border border-gray-300 px-6 py-3">Total</td>
                      <td className="border border-gray-300 px-6 py-3">
                        {frequencyData.reduce((sum, r) => sum + r.frequency, 0)}
                      </td>
                      <td className="border border-gray-300 px-6 py-3">1.000</td>
                      <td className="border border-gray-300 px-6 py-3">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
              <h4 className="font-semibold text-yellow-900 mb-2">When to Use Frequency Tables</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• Organizing large datasets into manageable groups</li>
                <li>• Showing distribution of categorical or grouped data</li>
                <li>• Calculating cumulative frequencies</li>
                <li>• Preparing data for graphical representation</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'charts' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Bar Chart</h4>
                <p className="text-sm text-gray-600 mb-4">Best for comparing categories</p>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={frequencyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="frequency" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Pie Chart</h4>
                <p className="text-sm text-gray-600 mb-4">Shows proportions of a whole</p>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 md:col-span-2">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Line Graph</h4>
                <p className="text-sm text-gray-600 mb-4">Perfect for showing trends over time</p>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Choosing the Right Chart</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h5 className="font-semibold text-gray-800">Bar/Column Chart</h5>
                  <p className="text-sm text-gray-600 mt-1">Compare distinct categories or groups</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h5 className="font-semibold text-gray-800">Line Graph</h5>
                  <p className="text-sm text-gray-600 mt-1">Show trends and changes over time</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h5 className="font-semibold text-gray-800">Pie Chart</h5>
                  <p className="text-sm text-gray-600 mt-1">Display parts of a whole (percentages)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <button 
          onClick={() => markComplete(2)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all flex items-center"
        >
          Mark Complete <Check className="w-5 h-5 ml-2" />
        </button>
      </div>
    );
  };

  const CentralTendencySection = () => {
    const exampleData = [12, 15, 18, 20, 22, 25, 28, 30];
    const mean = (exampleData.reduce((a, b) => a + b, 0) / exampleData.length).toFixed(2);
    const sorted = [...exampleData].sort((a, b) => a - b);
    const median = ((sorted[3] + sorted[4]) / 2).toFixed(2);

    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Measures of Central Tendency</h2>
        
        <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
          <h3 className="text-xl font-semibold text-purple-900 mb-3">Finding the "Center"</h3>
          <p className="text-gray-700">
            Central tendency measures identify the typical or central value in a dataset. The three main 
            measures are mean, median, and mode.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white border-2 border-blue-300 rounded-lg p-6">
            <h4 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
              <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center mr-3">1</span>
              Mean (Average)
            </h4>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="font-semibold text-gray-800 mb-2">Formula:</p>
              <div className="bg-white p-4 rounded border-2 border-blue-300 font-mono text-lg text-center">
                Mean = Σx / n
              </div>
              <p className="text-sm text-gray-600 mt-2">where Σx = sum of all values, n = number of values</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="font-semibold text-gray-800 mb-2">Example:</p>
              <p className="text-gray-700 mb-2">Data: {exampleData.join(', ')}</p>
              <p className="text-gray-700 mb-2">Sum: {exampleData.reduce((a, b) => a + b, 0)}</p>
              <p className="text-gray-700 mb-2">Count: {exampleData.length}</p>
              <p className="text-blue-700 font-bold text-lg">Mean = {mean}</p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="font-semibold text-yellow-900 mb-1">Best Used When:</p>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Data is numerical and continuous</li>
                <li>• No extreme outliers present</li>
                <li>• You need the mathematical "balance point"</li>
              </ul>
            </div>
          </div>

          <div className="bg-white border-2 border-green-300 rounded-lg p-6">
            <h4 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
              <span className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center mr-3">2</span>
              Median (Middle Value)
            </h4>
            
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <p className="font-semibold text-gray-800 mb-2">How to Find:</p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Arrange data in ascending order</li>
                <li>If n is odd: middle value</li>
                <li>If n is even: average of two middle values</li>
              </ol>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="font-semibold text-gray-800 mb-2">Example:</p>
              <p className="text-gray-700 mb-2">Sorted: {sorted.join(', ')}</p>
              <p className="text-gray-700 mb-2">Middle values: {sorted[3]} and {sorted[4]}</p>
              <p className="text-green-700 font-bold text-lg">Median = ({sorted[3]} + {sorted[4]}) / 2 = {median}</p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="font-semibold text-yellow-900 mb-1">Best Used When:</p>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Data has outliers or is skewed</li>
                <li>• Working with ordinal data</li>
                <li>• You need a resistant measure</li>
              </ul>
            </div>
          </div>

          <div className="bg-white border-2 border-orange-300 rounded-lg p-6">
            <h4 className="text-2xl font-bold text-orange-800 mb-4 flex items-center">
              <span className="bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center mr-3">3</span>
              Mode (Most Frequent)
            </h4>
            
            <div className="bg-orange-50 p-4 rounded-lg mb-4">
              <p className="font-semibold text-gray-800 mb-2">Definition:</p>
              <p className="text-gray-700">The value that appears most frequently in the dataset.</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="font-semibold text-gray-800 mb-2">Examples:</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-white rounded">
                  <span className="font-mono">2, 3, 3, 5, 7, 3, 8</span>
                  <span className="text-orange-700 font-bold">Mode = 3</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded">
                  <span className="font-mono">1, 2, 2, 3, 3, 4</span>
                  <span className="text-orange-700 font-bold">Bimodal: 2 and 3</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded">
                  <span className="font-mono">5, 10, 15, 20, 25</span>
                  <span className="text-orange-700 font-bold">No mode</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="font-semibold text-yellow-900 mb-1">Best Used When:</p>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Working with categorical data</li>
                <li>• Identifying most popular item</li>
                <li>• Data is discrete or nominal</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-purple-300 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Comparison</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Measure</th>
                  <th className="px-4 py-2 text-left">Strength</th>
                  <th className="px-4 py-2 text-left">Weakness</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">Mean</td>
                  <td className="px-4 py-2">Uses all data points</td>
                  <td className="px-4 py-2">Affected by outliers</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">Median</td>
                  <td className="px-4 py-2">Resistant to outliers</td>
                  <td className="px-4 py-2">Ignores extreme values</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Mode</td>
                  <td className="px-4 py-2">Works with any data type</td>
                  <td className="px-4 py-2">May not exist or be unique</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <button 
          onClick={() => markComplete(3)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all flex items-center"
        >
          Mark Complete <Check className="w-5 h-5 ml-2" />
        </button>
      </div>
    );
  };

  const DispersionSection = () => {
    const exampleData = [10, 12, 15, 18, 20, 22, 25, 30];
    const mean = exampleData.reduce((a, b) => a + b, 0) / exampleData.length;
    const deviations = exampleData.map(x => (x - mean).toFixed(2));
    const squaredDev = exampleData.map(x => Math.pow(x - mean, 2).toFixed(2));
    const variance = (squaredDev.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / exampleData.length).toFixed(2);
    const stdDev = Math.sqrt(variance).toFixed(2);
    const range = exampleData[exampleData.length - 1] - exampleData[0];

    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Measures of Dispersion</h2>
        
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
          <h3 className="text-xl font-semibold text-red-900 mb-3">Understanding Spread</h3>
          <p className="text-gray-700">
            Dispersion measures tell us how spread out or scattered the data is. Two datasets can have the 
            same mean but very different spreads!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Low Dispersion</h4>
            <p className="text-sm text-gray-600 mb-3">Data points close together</p>
            <div className="bg-blue-50 p-3 rounded font-mono text-sm">
              85, 87, 88, 90, 92, 93, 95
            </div>
            <p className="text-xs text-gray-500 mt-2">Mean: 90, Small variation</p>
          </div>
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">High Dispersion</h4>
            <p className="text-sm text-gray-600 mb-3">Data points spread far apart</p>
            <div className="bg-red-50 p-3 rounded font-mono text-sm">
              20, 45, 70, 90, 110, 135, 160
            </div>
            <p className="text-xs text-gray-500 mt-2">Mean: 90, Large variation</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border-2 border-blue-300 rounded-lg p-6">
            <h4 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
              <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center mr-3">1</span>
              Range
            </h4>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="font-semibold text-gray-800 mb-2">Formula:</p>
              <div className="bg-white p-4 rounded border-2 border-blue-300 font-mono text-lg text-center">
                Range = Maximum - Minimum
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-800 mb-2">Example:</p>
              <p className="text-gray-700 mb-2">Data: {exampleData.join(', ')}</p>
              <p className="text-gray-700 mb-2">Maximum: {exampleData[exampleData.length - 1]}</p>
              <p className="text-gray-700 mb-2">Minimum: {exampleData[0]}</p>
              <p className="text-blue-700 font-bold text-lg">Range = {range}</p>
            </div>

            <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-3">
              <p className="text-sm text-gray-700"><strong>Limitation:</strong> Only uses two values, ignores the rest</p>
            </div>
          </div>

          <div className="bg-white border-2 border-green-300 rounded-lg p-6">
            <h4 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
              <span className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center mr-3">2</span>
              Variance
            </h4>
            
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <p className="font-semibold text-gray-800 mb-2">Formula:</p>
              <div className="bg-white p-4 rounded border-2 border-green-300 font-mono text-lg text-center">
                σ² = Σ(x - μ)² / n
              </div>
              <p className="text-sm text-gray-600 mt-2">Average of squared deviations from the mean</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
              <p className="font-semibold text-gray-800 mb-3">Step-by-Step Calculation:</p>
              <table className="min-w-full text-sm">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="px-3 py-2">x</th>
                    <th className="px-3 py-2">x - μ</th>
                    <th className="px-3 py-2">(x - μ)²</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {exampleData.slice(0, 4).map((val, idx) => (
                    <tr key={idx} className="border-b text-center">
                      <td className="px-3 py-2">{val}</td>
                      <td className="px-3 py-2">{deviations[idx]}</td>
                      <td className="px-3 py-2">{squaredDev[idx]}</td>
                    </tr>
                  ))}
                  <tr className="text-center">
                    <td className="px-3 py-2" colSpan="3">...</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-green-700 font-bold text-lg mt-3">Variance (σ²) = {variance}</p>
            </div>
          </div>

          <div className="bg-white border-2 border-purple-300 rounded-lg p-6">
            <h4 className="text-2xl font-bold text-purple-800 mb-4 flex items-center">
              <span className="bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center mr-3">3</span>
              Standard Deviation
            </h4>
            
            <div className="bg-purple-50 p-4 rounded-lg mb-4">
              <p className="font-semibold text-gray-800 mb-2">Formula:</p>
              <div className="bg-white p-4 rounded border-2 border-purple-300 font-mono text-lg text-center">
                σ = √(σ²)
              </div>
              <p className="text-sm text-gray-600 mt-2">Square root of variance (in original units)</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="font-semibold text-gray-800 mb-2">Example:</p>
              <p className="text-gray-700 mb-2">Variance: {variance}</p>
              <p className="text-purple-700 font-bold text-lg">Standard Deviation (σ) = √{variance} = {stdDev}</p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="font-semibold text-blue-900 mb-2">Interpretation:</p>
              <p className="text-sm text-gray-700">
                On average, data points deviate from the mean by approximately {stdDev} units.
              </p>
            </div>

            <div className="mt-4 bg-green-50 border-l-4 border-green-400 p-3">
              <p className="text-sm text-gray-700">
                <strong>Why use SD over variance?</strong> Same units as original data, easier to interpret
              </p>
            </div>
          </div>

          <div className="bg-white border-2 border-orange-300 rounded-lg p-6">
            <h4 className="text-2xl font-bold text-orange-800 mb-4 flex items-center">
              <span className="bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center mr-3">4</span>
              Interquartile Range (IQR)
            </h4>
            
            <div className="bg-orange-50 p-4 rounded-lg mb-4">
              <p className="font-semibold text-gray-800 mb-2">Formula:</p>
              <div className="bg-white p-4 rounded border-2 border-orange-300 font-mono text-lg text-center">
                IQR = Q3 - Q1
              </div>
              <p className="text-sm text-gray-600 mt-2">Range of the middle 50% of data</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-800 mb-2">Quartiles:</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>Q1 (25th percentile):</strong> 25% of data below this value</li>
                <li><strong>Q2 (50th percentile):</strong> The median</li>
                <li><strong>Q3 (75th percentile):</strong> 75% of data below this value</li>
              </ul>
            </div>

            <div className="mt-4 bg-green-50 border-l-4 border-green-400 p-3">
              <p className="text-sm text-gray-700">
                <strong>Advantage:</strong> Not affected by extreme outliers
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-orange-300 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Choosing the Right Measure</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg">
              <h5 className="font-semibold text-gray-800 mb-2">Use Range when:</h5>
              <ul className="text-gray-700 space-y-1">
                <li>• Need quick, simple measure</li>
                <li>• Data has no outliers</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h5 className="font-semibold text-gray-800 mb-2">Use Standard Deviation when:</h5>
              <ul className="text-gray-700 space-y-1">
                <li>• Need precise measure</li>
                <li>• Data is roughly normal</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h5 className="font-semibold text-gray-800 mb-2">Use IQR when:</h5>
              <ul className="text-gray-700 space-y-1">
                <li>• Data has outliers</li>
                <li>• Need robust measure</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h5 className="font-semibold text-gray-800 mb-2">Use Variance when:</h5>
              <ul className="text-gray-700 space-y-1">
                <li>• Doing further calculations</li>
                <li>• Need mathematical properties</li>
              </ul>
            </div>
          </div>
        </div>

        <button 
          onClick={() => markComplete(4)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all flex items-center"
        >
          Mark Complete <Check className="w-5 h-5 ml-2" />
        </button>
      </div>
    );
  };

  const StatisticalSoftwareSection = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Statistical Software Calculator</h2>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
          <h3 className="text-xl font-semibold text-purple-900 mb-3">Interactive Analysis Tool</h3>
          <p className="text-gray-700">
            Enter your own dataset and instantly calculate all descriptive statistics we've learned about!
          </p>
        </div>

        <div className="bg-white border-2 border-gray-300 rounded-lg p-6 shadow-lg">
          <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Calculator className="w-6 h-6 mr-2 text-blue-600" />
            Data Input
          </h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Enter your data (comma-separated numbers):
              </label>
              <textarea
                value={userDataset}
                onChange={(e) => setUserDataset(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg font-mono text-sm focus:border-blue-500 focus:outline-none"
                rows="3"
                placeholder="e.g., 12, 15, 18, 20, 22, 25, 28, 30"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter numerical values separated by commas
              </p>
            </div>

            <button
              onClick={handleCalculate}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center w-full font-semibold"
            >
              <Play className="w-5 h-5 mr-2" />
              Calculate Statistics
            </button>
          </div>
        </div>

        {calculatedStats && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-6">
              <h4 className="text-xl font-semibold text-green-900 mb-4 flex items-center">
                <Check className="w-6 h-6 mr-2" />
                Analysis Complete!
              </h4>
              <p className="text-gray-700 mb-2">
                <strong>Sample Size:</strong> {calculatedStats.n} values
              </p>
              <p className="text-gray-700 text-sm font-mono">
                Data: {calculatedStats.data.join(', ')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border-2 border-blue-300 rounded-lg p-6">
                <h5 className="text-lg font-semibold text-blue-800 mb-4 flex items-center border-b-2 border-blue-200 pb-2">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Measures of Central Tendency
                </h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                    <span className="font-semibold text-gray-700">Mean (Average):</span>
                    <span className="text-blue-700 font-bold text-lg">{calculatedStats.mean}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                    <span className="font-semibold text-gray-700">Median (Middle):</span>
                    <span className="text-green-700 font-bold text-lg">{calculatedStats.median}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                    <span className="font-semibold text-gray-700">Mode (Most Frequent):</span>
                    <span className="text-purple-700 font-bold text-lg">{calculatedStats.mode}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-red-300 rounded-lg p-6">
                <h5 className="text-lg font-semibold text-red-800 mb-4 flex items-center border-b-2 border-red-200 pb-2">
                  <Calculator className="w-5 h-5 mr-2" />
                  Measures of Dispersion
                </h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                    <span className="font-semibold text-gray-700">Range:</span>
                    <span className="text-orange-700 font-bold text-lg">{calculatedStats.range}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                    <span className="font-semibold text-gray-700">Variance (σ²):</span>
                    <span className="text-red-700 font-bold text-lg">{calculatedStats.variance}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-pink-50 rounded">
                    <span className="font-semibold text-gray-700">Std Deviation (σ):</span>
                    <span className="text-pink-700 font-bold text-lg">{calculatedStats.stdDev}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                    <span className="font-semibold text-gray-700">IQR (Q3 - Q1):</span>
                    <span className="text-yellow-700 font-bold text-lg">{calculatedStats.iqr}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h5 className="text-lg font-semibold text-gray-800 mb-4 flex items-center border-b-2 border-gray-200 pb-2">
                  <Database className="w-5 h-5 mr-2" />
                  Five-Number Summary
                </h5>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 border-b">
                    <span className="text-gray-700">Minimum:</span>
                    <span className="font-bold text-gray-800">{calculatedStats.min}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 border-b">
                    <span className="text-gray-700">Q1 (25th percentile):</span>
                    <span className="font-bold text-gray-800">{calculatedStats.q1}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 border-b bg-blue-50">
                    <span className="text-gray-700">Median (Q2):</span>
                    <span className="font-bold text-blue-700">{calculatedStats.median}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 border-b">
                    <span className="text-gray-700">Q3 (75th percentile):</span>
                    <span className="font-bold text-gray-800">{calculatedStats.q3}</span>
                  </div>
                  <div className="flex justify-between items-center p-2">
                    <span className="text-gray-700">Maximum:</span>
                    <span className="font-bold text-gray-800">{calculatedStats.max}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-purple-300 rounded-lg p-6">
                <h5 className="text-lg font-semibold text-purple-800 mb-4">Interpretation Guide</h5>
                <div className="space-y-3 text-sm">
                  <div className="bg-white p-3 rounded">
                    <p className="text-gray-700">
                      <strong>Mean vs Median:</strong> If they're very different, your data may be skewed.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <p className="text-gray-700">
                      <strong>Standard Deviation:</strong> Larger values indicate more spread in the data.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <p className="text-gray-700">
                      <strong>IQR:</strong> Contains the middle 50% of your data points.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6">
              <h5 className="font-semibold text-green-900 mb-3 flex items-center">
                <Check className="w-5 h-5 mr-2" />
                Try These Practice Datasets:
              </h5>
              <div className="grid md:grid-cols-3 gap-3">
                <button
                  onClick={() => setUserDataset('75, 80, 82, 85, 88, 90, 92, 95, 98')}
                  className="bg-white p-3 rounded-lg hover:bg-green-100 transition-all border-2 border-green-300 text-sm"
                >
                  Student Test Scores
                </button>
                <button
                  onClick={() => setUserDataset('23, 25, 29, 32, 35, 38, 40, 42, 45, 48')}
                  className="bg-white p-3 rounded-lg hover:bg-green-100 transition-all border-2 border-green-300 text-sm"
                >
                  Employee Ages
                </button>
                <button
                  onClick={() => setUserDataset('100, 105, 102, 110, 98, 115, 103, 108, 112')}
                  className="bg-white p-3 rounded-lg hover:bg-green-100 transition-all border-2 border-green-300 text-sm"
                >
                  Product Prices
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-300 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-indigo-900 mb-4">Popular Statistical Software</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h5 className="font-semibold text-gray-800 mb-2">SPSS</h5>
              <p className="text-sm text-gray-600">User-friendly, widely used in social sciences</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h5 className="font-semibold text-gray-800 mb-2">R</h5>
              <p className="text-sm text-gray-600">Free, open-source, powerful for data analysis</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h5 className="font-semibold text-gray-800 mb-2">Python (pandas, scipy)</h5>
              <p className="text-sm text-gray-600">Programming language with statistical libraries</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h5 className="font-semibold text-gray-800 mb-2">Excel</h5>
              <p className="text-sm text-gray-600">Accessible, built-in statistical functions</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => markComplete(5)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all flex items-center"
        >
          Mark Complete <Check className="w-5 h-5 ml-2" />
        </button>
      </div>
    );
  };

  const renderSection = () => {
    switch (currentSection) {
      case 0: return <IntroSection />;
      case 1: return <DataPreparationSection />;
      case 2: return <DataPresentationSection />;
      case 3: return <CentralTendencySection />;
      case 4: return <DispersionSection />;
      case 5: return <StatisticalSoftwareSection />;
      default: return <IntroSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Descriptive Statistics
          </h1>
          <p className="text-gray-600">
            An Interactive Learning Experience
          </p>
          <div className="mt-4 flex items-center text-sm text-gray-600">
            <Database className="w-4 h-4 mr-2" />
            <span>Complete: {completedSections.length} / {sections.length}</span>
          </div>
        </header>

        <div className="grid md:grid-cols-4 gap-6">
          <nav className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-4 sticky top-4">
              <h3 className="font-semibold text-gray-800 mb-4">Lessons</h3>
              <div className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(section.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                      currentSection === section.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      {section.icon}
                      <span className="ml-3 text-sm font-medium">{section.title}</span>
                    </div>
                    {completedSections.includes(section.id) && (
                      <Check className="w-4 h-4 text-green-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          <main className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-xl p-8">
              {renderSection()}
              
              <div className="flex justify-between items-center mt-8 pt-6 border-t-2 border-gray-200">
                <button
                  onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                  disabled={currentSection === 0}
                  className={`flex items-center px-6 py-3 rounded-lg transition-all ${
                    currentSection === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-600 text-white hover:bg-gray-700'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Previous
                </button>
                
                <button
                  onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
                  disabled={currentSection === sections.length - 1}
                  className={`flex items-center px-6 py-3 rounded-lg transition-all ${
                    currentSection === sections.length - 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </main>
        </div>

        <footer className="mt-8 bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="border-t-4 border-blue-600 pt-4">
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              IT 318 QUANTITATIVE METHODS
            </h3>
            <p className="text-gray-600 font-medium">
              SDBMANLAPAZ
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DescriptiveStatisticsLesson;