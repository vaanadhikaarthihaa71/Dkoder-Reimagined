import React, { useState, useEffect } from 'react';
import { 
  DashboardLayout 
} from '../components/dashboard/DashboardLayout';
import { 
  OverviewStatCard 
} from '../components/dashboard/OverviewStatCard';
import { 
  DailyPracticeCard 
} from '../components/dashboard/DailyPracticeCard';
import { 
  PerformanceAnalytics 
} from '../components/dashboard/PerformanceAnalytics';
import { 
  CodingLabModal 
} from '../components/home/CodingLabModal';
import { MOCK_QUESTIONS, STUDENT_RANKINGS, PRICING_PLANS } from '../data/mockData';
import { Question } from '../types';
import { useToast } from '../context/ToastContext';
import { 
  Code2, 
  CheckCircle2, 
  CalendarDays, 
  Trophy, 
  Flame, 
  Target, 
  Sparkles, 
  Play, 
  Clock, 
  BookOpen, 
  Layers, 
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  RotateCcw
} from 'lucide-react';
import { Button } from '../components/common/Button';

interface DashboardPageProps {
  onNavigate: (path: string) => void;
}

interface SubmittedChallenge {
  id: string;
  title: string;
  company: string;
  difficulty: string;
  lang: string;
  timeAgo: string;
  xpEarned: number;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
  // Student baseline state (calculated dynamically from activity)
  const [studentName, setStudentName] = useState<string>('Karthik');
  const [problemsSolvedCount, setProblemsSolvedCount] = useState<number>(0);
  const [streakDays, setStreakDays] = useState<number>(0);
  const [placementXp, setPlacementXp] = useState<number>(0);
  const [examsCompleted, setExamsCompleted] = useState<number>(0);
  const [examsAccuracy, setExamsAccuracy] = useState<number>(0);
  const [recentSubmissions, setRecentSubmissions] = useState<SubmittedChallenge[]>([]);

  // Coding Lab Modal state
  const [selectedQuestionForLab, setSelectedQuestionForLab] = useState<Question | null>(null);

  // Filter state for Coding Challenges subview
  const [challengeFilterDifficulty, setChallengeFilterDifficulty] = useState<string>('All');
  const [challengeFilterCompany, setChallengeFilterCompany] = useState<string>('All');

  // Interactive MCQ subview state
  const [mcqQuestionIndex, setMcqQuestionIndex] = useState<number>(0);
  const [selectedMcqAnswer, setSelectedMcqAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [mcqCorrectCount, setMcqCorrectCount] = useState<number>(0);
  const [mcqTotalAnswered, setMcqTotalAnswered] = useState<number>(0);

  // Technical MCQs for the MCQ Practice tab
  const technicalMcqs = [
    {
      id: 'mcq-1',
      question: 'What is the worst-case time complexity of searching for an element in an unsorted array of size N?',
      options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
      correctIndex: 2,
      explanation: 'In an unsorted array, linear search must examine each of the N elements in the worst case.',
      company: 'TCS Ninja'
    },
    {
      id: 'mcq-2',
      question: 'Which SQL clause is used to filter records based on the result of an aggregate function such as COUNT() or AVG()?',
      options: ['WHERE', 'GROUP BY', 'HAVING', 'ORDER BY'],
      correctIndex: 2,
      explanation: 'HAVING is evaluated after GROUP BY aggregations, whereas WHERE filters individual rows before aggregation.',
      company: 'Accenture ASE'
    },
    {
      id: 'mcq-3',
      question: 'Which data structure follows the Last-In, First-Out (LIFO) principle and is commonly used in recursion call stacks?',
      options: ['Queue', 'Stack', 'Linked List', 'Priority Queue'],
      correctIndex: 1,
      explanation: 'A Stack is a LIFO data structure. Function invocation frames are pushed and popped from the call stack.',
      company: 'Infosys SE'
    }
  ];

  // Handle successful problem solution
  const handleSuccessSolved = (qId: string) => {
    const q = MOCK_QUESTIONS.find((item) => item.id === qId) || selectedQuestionForLab;
    if (!q) return;

    setProblemsSolvedCount((prev) => prev + 1);
    setStreakDays((prev) => (prev === 0 ? 1 : prev));
    setPlacementXp((prev) => prev + 50);

    const newSub: SubmittedChallenge = {
      id: `${Date.now()}`,
      title: q.title,
      company: q.company,
      difficulty: q.difficulty,
      lang: 'Python',
      timeAgo: 'Just now',
      xpEarned: 50
    };

    setRecentSubmissions((prev) => [newSub, ...prev]);

    addToast({
      type: 'success',
      title: 'Challenge Solved! 🎉',
      description: `+50 XP earned for ${q.title}. Daily streak active!`
    });
  };

  // Open coding lab for a question
  const handleOpenProblem = (q: Question) => {
    setSelectedQuestionForLab(q);
  };

  // Handle random practice problem from daily card
  const handleSolveFirstProblem = () => {
    const randomQ = MOCK_QUESTIONS[0];
    setSelectedQuestionForLab(randomQ);
  };

  // Handle MCQ submission
  const handleAnswerMcq = () => {
    if (selectedMcqAnswer === null) return;
    setIsAnswerSubmitted(true);
    const currentQ = technicalMcqs[mcqQuestionIndex];
    const isCorrect = selectedMcqAnswer === currentQ.correctIndex;

    const newTotal = mcqTotalAnswered + 1;
    const newCorrect = isCorrect ? mcqCorrectCount + 1 : mcqCorrectCount;
    setMcqTotalAnswered(newTotal);
    setMcqCorrectCount(newCorrect);

    // Update global performance metrics
    setExamsCompleted(newTotal);
    setExamsAccuracy(Math.round((newCorrect / newTotal) * 100));

    if (isCorrect) {
      setPlacementXp((prev) => prev + 20);
      addToast({
        type: 'success',
        title: 'Correct Answer! +20 XP',
        description: currentQ.explanation
      });
    } else {
      addToast({
        type: 'error',
        title: 'Incorrect Answer',
        description: currentQ.explanation
      });
    }
  };

  const handleNextMcq = () => {
    setIsAnswerSubmitted(false);
    setSelectedMcqAnswer(null);
    setMcqQuestionIndex((prev) => (prev + 1) % technicalMcqs.length);
  };

  // Filter questions for the Coding tab
  const filteredCodingChallenges = MOCK_QUESTIONS.filter((q) => {
    if (challengeFilterDifficulty !== 'All' && q.difficulty !== challengeFilterDifficulty) return false;
    if (challengeFilterCompany !== 'All' && q.company !== challengeFilterCompany) return false;
    return true;
  });

  return (
    <DashboardLayout
      activeTab={activeTab}
      onSelectTab={(tabId) => {
        if (tabId === 'hackathons') {
          onNavigate('/hackathons');
          return;
        }
        if (tabId === 'bundles') {
          onNavigate('/bundles/infosys');
          return;
        }
        setActiveTab(tabId);
      }}
      onNavigate={onNavigate}
      studentName={studentName}
    >
      {/* View 1: Main Dashboard (Default) */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Section 3: Daily overview and analytics (4 compact summary cards) */}
          <section aria-label="Daily Overview">
            <OverviewStatCard
              onNavigateToPractice={() => setActiveTab('coding')}
              onNavigateToLeaderboard={() => setActiveTab('leaderboard')}
              onNavigateToBundles={() => onNavigate('/bundles/infosys')}
            />
          </section>

          {/* Section 4: Daily practice callout */}
          <section aria-label="Daily Practice Callout">
            <DailyPracticeCard
              onSolveCodingProblem={handleSolveFirstProblem}
              onExploreMCQ={() => setActiveTab('mcq')}
            />
          </section>

          {/* Section 5: Performance analytics (4 compact cards) */}
          <section aria-label="Performance Analytics">
            <PerformanceAnalytics
              examAccuracy={examsAccuracy}
              examsCompleted={examsCompleted}
              examsTotal={technicalMcqs.length}
              problemsSolved={problemsSolvedCount}
              xpValue={placementXp}
              levelName={placementXp > 100 ? 'Achiever' : 'Rookie'}
              progressPercent={Math.min(100, Math.round((placementXp / 100) * 100))}
            />
          </section>

          {/* Recent Submissions / Activity Feed */}
          <section aria-label="Submissions Feed" className="bg-white rounded-2xl border border-[#E8E2EF] p-5 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2EF]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#5425A8]" />
                <h3 className="text-sm font-bold text-[#211B2B]">
                  Recent Submissions Log
                </h3>
              </div>
              <span className="text-[11px] text-[#706879]">
                Verified browser runtime
              </span>
            </div>

            {recentSubmissions.length === 0 ? (
              <div className="py-10 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#FAF8FD] text-[#948B9E] flex items-center justify-center mx-auto border border-[#E8E2EF]">
                  <Code2 className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold text-[#211B2B]">
                  No recent submissions logged yet
                </div>
                <p className="text-[11px] text-[#706879] max-w-sm mx-auto">
                  Problems solved in coding challenges or MCQ rounds will appear here with verification timestamps.
                </p>
                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab('coding')}
                    leftIcon={<Play className="w-3 h-3 text-[#5425A8]" />}
                  >
                    Solve a coding problem
                  </Button>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-[#E8E2EF] text-xs">
                {recentSubmissions.map((sub) => (
                  <div key={sub.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-[#211B2B]">{sub.title}</div>
                        <div className="text-[11px] text-[#706879]">
                          {sub.company} • {sub.lang} • {sub.timeAgo}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FAF8FD] text-[#5425A8] border border-[#E8E2EF]">
                        +{sub.xpEarned} XP
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800">
                        Accepted
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

        </div>
      )}

      {/* View 2: My Activity & Activity Calendar */}
      {(activeTab === 'activity' || activeTab === 'calendar') && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-2xl border border-[#E8E2EF] p-5 shadow-2xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#E8E2EF]">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F1E9FF] text-[#5425A8] text-[11px] font-semibold mb-1">
                  <CalendarDays className="w-3 h-3" />
                  <span>Consistency Heatmap</span>
                </div>
                <h2 className="text-lg font-bold text-[#211B2B]">
                  October 2026 Practice Calendar
                </h2>
              </div>

              <div className="flex items-center gap-2 bg-[#FAF8FD] border border-[#E8E2EF] px-3 py-1.5 rounded-xl text-xs">
                <Flame className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                <span className="font-bold text-[#211B2B]">{streakDays} Days</span>
                <span className="text-[#706879]">Active Streak</span>
              </div>
            </div>

            {/* Calendar Days Matrix */}
            <div className="py-6">
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-[#706879] mb-2">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>

              <div className="grid grid-cols-7 gap-2 text-xs">
                {Array.from({ length: 31 }, (_, i) => {
                  const dayNum = i + 1;
                  const isToday = dayNum === 23;
                  const isSolved = isToday && problemsSolvedCount > 0;

                  return (
                    <div
                      key={dayNum}
                      className={`h-14 rounded-xl border p-1.5 flex flex-col justify-between transition-all ${
                        isSolved
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                          : isToday
                          ? 'bg-[#F1E9FF] border-[#5425A8] text-[#5425A8] font-bold'
                          : 'bg-[#FAF8FD] border-[#E8E2EF] text-[#706879]'
                      }`}
                    >
                      <div className="flex justify-between items-center text-[11px]">
                        <span>{dayNum}</span>
                        {isToday && <span className="text-[9px] bg-[#5425A8] text-white px-1 rounded">Today</span>}
                      </div>
                      <div className="text-[10px]">
                        {isSolved ? '✓ Solved' : isToday ? 'Pending' : '-'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-[#E8E2EF] flex items-center justify-between text-xs text-[#706879]">
              <span>* Active days light up when challenges are completed in the browser IDE.</span>
              <Button variant="primary" size="sm" onClick={() => setActiveTab('coding')}>
                Solve Challenge Today
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* View 3: Coding Challenges Vault */}
      {activeTab === 'coding' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[#211B2B]">
                Coding Challenges Vault
              </h2>
              <p className="text-xs text-[#706879]">
                Authentic algorithmic problems from corporate recruiter drives.
              </p>
            </div>

            {/* Difficulty and Company Filters */}
            <div className="flex items-center gap-2">
              <select
                value={challengeFilterDifficulty}
                onChange={(e) => setChallengeFilterDifficulty(e.target.value)}
                className="px-2.5 py-1 rounded-lg border border-[#E8E2EF] text-xs font-medium text-[#211B2B] bg-white cursor-pointer"
              >
                <option value="All">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>

              <select
                value={challengeFilterCompany}
                onChange={(e) => setChallengeFilterCompany(e.target.value)}
                className="px-2.5 py-1 rounded-lg border border-[#E8E2EF] text-xs font-medium text-[#211B2B] bg-white cursor-pointer"
              >
                <option value="All">All Companies</option>
                <option value="TCS">TCS</option>
                <option value="Infosys">Infosys</option>
                <option value="Accenture">Accenture</option>
                <option value="Amazon">Amazon</option>
                <option value="Zoho">Zoho</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCodingChallenges.map((question) => (
              <div
                key={question.id}
                className="bg-white rounded-2xl border border-[#E8E2EF] p-4 flex flex-col justify-between hover:border-[#5425A8]/50 shadow-2xs transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold text-[#5425A8] uppercase tracking-wider">
                      {question.company} • {question.topic}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      question.difficulty === 'Easy'
                        ? 'bg-emerald-50 text-emerald-800'
                        : question.difficulty === 'Medium'
                        ? 'bg-amber-50 text-amber-800'
                        : 'bg-rose-50 text-rose-800'
                    }`}>
                      {question.difficulty}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-[#211B2B] line-clamp-1">
                    {question.title}
                  </h3>
                  <p className="text-xs text-[#706879] mt-1 line-clamp-2">
                    {question.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8E2EF] flex items-center justify-between">
                  <span className="text-[11px] text-[#706879]">
                    ~{question.estimatedMinutes} mins • {question.solversCount} Solvers
                  </span>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleOpenProblem(question)}
                    leftIcon={<Play className="w-3 h-3 fill-current" />}
                  >
                    Solve in Lab
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View 4: MCQ Practice */}
      {activeTab === 'mcq' && (
        <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
          <div className="bg-white rounded-2xl border border-[#E8E2EF] p-6 shadow-2xs">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2EF] mb-4">
              <div>
                <span className="text-[11px] font-bold uppercase text-[#5425A8]">
                  Technical MCQ Diagnostic
                </span>
                <div className="text-xs text-[#706879]">
                  Question {mcqQuestionIndex + 1} of {technicalMcqs.length} • {technicalMcqs[mcqQuestionIndex].company}
                </div>
              </div>
              <div className="text-xs font-semibold text-[#211B2B] bg-[#FAF8FD] px-2.5 py-1 rounded-lg border border-[#E8E2EF]">
                Accuracy: {examsAccuracy}% ({mcqCorrectCount}/{mcqTotalAnswered})
              </div>
            </div>

            {/* Question prompt */}
            <h3 className="text-base font-bold text-[#211B2B] leading-snug mb-5">
              {technicalMcqs[mcqQuestionIndex].question}
            </h3>

            {/* Options list */}
            <div className="space-y-2.5 mb-6">
              {technicalMcqs[mcqQuestionIndex].options.map((opt, idx) => {
                const isSelected = selectedMcqAnswer === idx;
                const isCorrect = idx === technicalMcqs[mcqQuestionIndex].correctIndex;
                let optionClass = 'bg-[#FAF8FD] border-[#E8E2EF] text-[#211B2B] hover:border-[#5425A8]';

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    optionClass = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold';
                  } else if (isSelected) {
                    optionClass = 'bg-rose-50 border-rose-300 text-rose-900';
                  }
                } else if (isSelected) {
                  optionClass = 'bg-[#F1E9FF] border-[#5425A8] text-[#5425A8] font-semibold';
                }

                return (
                  <div
                    key={idx}
                    onClick={() => !isAnswerSubmitted && setSelectedMcqAnswer(idx)}
                    className={`p-3 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${optionClass}`}
                  >
                    <span>{opt}</span>
                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Explanation box after submission */}
            {isAnswerSubmitted && (
              <div className="p-3.5 rounded-xl bg-[#FAF8FD] border border-[#E8E2EF] text-xs space-y-1 mb-5 animate-fadeIn">
                <div className="font-bold text-[#211B2B]">Explanation:</div>
                <p className="text-[#706879] leading-relaxed">
                  {technicalMcqs[mcqQuestionIndex].explanation}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-[#E8E2EF]">
              <span className="text-[11px] text-[#706879]">
                MCQ accuracy automatically counts toward your placement readiness profile.
              </span>

              {!isAnswerSubmitted ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAnswerMcq}
                  disabled={selectedMcqAnswer === null}
                >
                  Submit Answer
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleNextMcq}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Next Question
                </Button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* View 5: Leaderboard */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-2xl border border-[#E8E2EF] p-5 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2EF] mb-4">
              <div>
                <h2 className="text-lg font-bold text-[#211B2B]">
                  Campus Leaderboard
                </h2>
                <p className="text-xs text-[#706879]">
                  Peer benchmarking and consistency rankings across engineering colleges.
                </p>
              </div>
              <span className="text-xs font-semibold text-[#5425A8] bg-[#F1E9FF] px-2.5 py-1 rounded-lg">
                Your Status: Unranked
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#FAF8FD] text-[#706879] uppercase text-[10px] font-semibold border-b border-[#E8E2EF]">
                  <tr>
                    <th className="p-2.5 text-center w-12">Rank</th>
                    <th className="p-2.5">Student</th>
                    <th className="p-2.5">College</th>
                    <th className="p-2.5 text-center">Streak</th>
                    <th className="p-2.5 text-right">Placement XP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E2EF] text-[#211B2B]">
                  {STUDENT_RANKINGS.map((student, idx) => (
                    <tr key={student.id} className="hover:bg-[#FAF8FD]">
                      <td className="p-2.5 text-center font-bold">
                        {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}
                      </td>
                      <td className="p-2.5 font-semibold">
                        {student.name}
                      </td>
                      <td className="p-2.5 text-[#706879]">
                        {student.college}
                      </td>
                      <td className="p-2.5 text-center font-bold text-[#F59E0B]">
                        {student.streakDays}d
                      </td>
                      <td className="p-2.5 text-right font-bold text-[#5425A8]">
                        {student.xp.toLocaleString()} XP
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* View 6: Platform Arena */}
      {activeTab === 'arena' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-2xl border border-[#E8E2EF] p-6 shadow-2xs">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#5425A8]">
                DKODER Placement Arena
              </span>
            </div>
            <h2 className="text-xl font-black text-[#211B2B]">
              Weekend Inter-College Coding Battle
            </h2>
            <p className="text-xs text-[#706879] mt-1 max-w-xl">
              Simulate high-pressure corporate online assessments (OA). 3 Algorithmic problems, 90 minutes, instant test case grading.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
              <div className="p-3 rounded-xl bg-[#FAF8FD] border border-[#E8E2EF]">
                <div className="text-[10px] uppercase font-bold text-[#706879]">Starts In</div>
                <div className="text-base font-black text-[#211B2B] mt-0.5">2d 14h 20m</div>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF8FD] border border-[#E8E2EF]">
                <div className="text-[10px] uppercase font-bold text-[#706879]">Format</div>
                <div className="text-base font-black text-[#211B2B] mt-0.5">3 DSA Problems</div>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF8FD] border border-[#E8E2EF]">
                <div className="text-[10px] uppercase font-bold text-[#706879]">Eligibility</div>
                <div className="text-base font-black text-[#059669] mt-0.5">Free for All Students</div>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={() => {
                addToast({
                  type: 'success',
                  title: 'Registered for Arena',
                  description: 'Reminder set for the weekend coding battle.'
                });
              }}
            >
              Register for Free Arena
            </Button>
          </div>
        </div>
      )}

      {/* View 7: My Progress */}
      {activeTab === 'progress' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-2xl border border-[#E8E2EF] p-5 shadow-2xs">
            <h2 className="text-lg font-bold text-[#211B2B] mb-1">
              Curriculum Mastery & Progress
            </h2>
            <p className="text-xs text-[#706879] mb-4">
              Track completion across the 4 pillar placement competencies.
            </p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Data Structures (Arrays, Strings, Trees)</span>
                  <span className="text-[#5425A8]">{problemsSolvedCount > 0 ? '12%' : '0%'}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#E8E2EF] overflow-hidden">
                  <div className="h-full bg-[#5425A8] rounded-full" style={{ width: problemsSolvedCount > 0 ? '12%' : '0%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Algorithms & Dynamic Programming</span>
                  <span className="text-[#5425A8]">0%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#E8E2EF] overflow-hidden">
                  <div className="h-full bg-[#5425A8] rounded-full" style={{ width: '0%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>SQL, DBMS & Operating Systems</span>
                  <span className="text-[#5425A8]">{examsAccuracy > 0 ? `${examsAccuracy}%` : '0%'}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#E8E2EF] overflow-hidden">
                  <div className="h-full bg-[#5425A8] rounded-full" style={{ width: `${examsAccuracy}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View 8: Courses & Learn */}
      {(activeTab === 'courses' || activeTab === 'webinars' || activeTab === 'projects' || activeTab === 'resources' || activeTab === 'learning') && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-2xl border border-[#E8E2EF] p-5 shadow-2xs">
            <h2 className="text-lg font-bold text-[#211B2B] capitalize">
              {activeTab === 'courses' ? 'Placement Courses' : activeTab === 'webinars' ? 'Events & Webinars' : activeTab === 'projects' ? 'Final Year Projects' : 'Learning Resources'}
            </h2>
            <p className="text-xs text-[#706879] mt-0.5 mb-4">
              Curated educational materials for engineering placement preparation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#FAF8FD] border border-[#E8E2EF] space-y-2">
                <span className="text-[10px] font-bold text-[#5425A8] uppercase">Course 1</span>
                <h4 className="text-xs font-bold text-[#211B2B]">Data Structures & Algorithms Sprint</h4>
                <p className="text-[11px] text-[#706879]">32 Hours of structured problem solving from basic arrays to dynamic programming.</p>
                <button onClick={() => setActiveTab('coding')} className="text-xs font-semibold text-[#5425A8] hover:underline">
                  Start Learning →
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8FD] border border-[#E8E2EF] space-y-2">
                <span className="text-[10px] font-bold text-[#5425A8] uppercase">Course 2</span>
                <h4 className="text-xs font-bold text-[#211B2B]">Service Company Fast-Track (TCS & Infosys)</h4>
                <p className="text-[11px] text-[#706879]">Aptitude, pseudo-code analysis, and mandatory coding questions.</p>
                <button onClick={() => onNavigate('/bundles/infosys')} className="text-xs font-semibold text-[#5425A8] hover:underline">
                  View Syllabus →
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8FD] border border-[#E8E2EF] space-y-2">
                <span className="text-[10px] font-bold text-[#5425A8] uppercase">Webinar</span>
                <h4 className="text-xs font-bold text-[#211B2B]">Cracking Product SDE Rounds (18+ LPA)</h4>
                <p className="text-[11px] text-[#706879]">Alumni session covering Low-Level Design and system architecture.</p>
                <button onClick={() => addToast({ type: 'info', title: 'Webinar Reminder Set', description: 'Session link will be sent to your email.' })} className="text-xs font-semibold text-[#5425A8] hover:underline">
                  Register Free →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View 9: Subscription Plan Management */}
      {activeTab === 'subscription' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-2xl border border-[#E8E2EF] p-5 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2EF] mb-4">
              <div>
                <h2 className="text-lg font-bold text-[#211B2B]">
                  Your Plan: <span className="text-[#5425A8]">Free Plan</span>
                </h2>
                <p className="text-xs text-[#706879]">
                  Base access to standard practice questions and public hackathons.
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onNavigate('/student/subscription')}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                View All Plans
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#FAF8FD] border-2 border-[#5425A8] relative">
                <span className="text-[10px] font-bold text-[#5425A8] uppercase">Current Plan</span>
                <h3 className="font-bold text-sm text-[#211B2B] mt-1">Free Tier</h3>
                <div className="text-lg font-black text-[#211B2B] my-1">₹0</div>
                <p className="text-[11px] text-[#706879]">Access to 100+ public questions, browser compiler, and basic leaderboard.</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E8E2EF] hover:border-[#5425A8] transition-all">
                <span className="text-[10px] font-bold text-[#F59E0B] uppercase">Most Popular</span>
                <h3 className="font-bold text-sm text-[#211B2B] mt-1">Platinum Plan</h3>
                <div className="text-lg font-black text-[#211B2B] my-1">₹1,999 / yr</div>
                <p className="text-[11px] text-[#706879]">All company tracks, mock assessments, full solution videos, and AI code review.</p>
                <div className="mt-3">
                  <Button variant="outline" size="sm" onClick={() => onNavigate('/student/subscription')} fullWidth>
                    Upgrade to Platinum
                  </Button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E8E2EF] hover:border-[#5425A8] transition-all">
                <span className="text-[10px] font-bold text-[#706879] uppercase">Campus Track</span>
                <h3 className="font-bold text-sm text-[#211B2B] mt-1">College Subsidized</h3>
                <div className="text-lg font-black text-[#211B2B] my-1">100% MOU Grant</div>
                <p className="text-[11px] text-[#706879]">If your engineering institution has signed a DKODER MOU, access is fully sponsored.</p>
                <div className="mt-3">
                  <Button variant="outline" size="sm" onClick={() => onNavigate('/partner-mou')} fullWidth>
                    Check MOU Status
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View 10: Settings */}
      {activeTab === 'settings' && (
        <div className="max-w-xl mx-auto space-y-6 animate-fadeIn">
          <div className="bg-white rounded-2xl border border-[#E8E2EF] p-6 shadow-2xs">
            <h2 className="text-lg font-bold text-[#211B2B] pb-2 border-b border-[#E8E2EF] mb-4">
              Student Profile & Placement Target
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-[#211B2B] block mb-1">Student Full Name</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8E2EF] text-xs text-[#211B2B] focus:outline-none focus:ring-1 focus:ring-[#5425A8]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#211B2B] block mb-1">Engineering Institution</label>
                <input
                  type="text"
                  defaultValue="Anna University (CEG Campus)"
                  className="w-full px-3 py-2 rounded-xl border border-[#E8E2EF] text-xs text-[#211B2B] bg-[#FAF8FD]"
                  disabled
                />
              </div>

              <div>
                <label className="font-semibold text-[#211B2B] block mb-1">Target Package Tier</label>
                <select className="w-full px-3 py-2 rounded-xl border border-[#E8E2EF] text-xs text-[#211B2B] bg-white">
                  <option>Super Dream Tier (18+ LPA)</option>
                  <option>Differential Tier (7 - 12 LPA)</option>
                  <option>Service Company Track (3.5 - 7 LPA)</option>
                </select>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    addToast({
                      type: 'success',
                      title: 'Preferences Saved',
                      description: 'Your student profile settings have been updated.'
                    });
                  }}
                >
                  Save Profile Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* In-Browser Coding Lab Modal */}
      {selectedQuestionForLab && (
        <CodingLabModal
          question={selectedQuestionForLab}
          isOpen={!!selectedQuestionForLab}
          onClose={() => setSelectedQuestionForLab(null)}
          onSuccessSolved={handleSuccessSolved}
        />
      )}

    </DashboardLayout>
  );
};
