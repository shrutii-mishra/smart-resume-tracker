import React, { useState } from 'react';
import FileUpload from '../components/FileUpload/FileUpload';
import ScoreBreakdown from '../components/ScoreBreakdown/ScoreBreakdown';
import SuggestionsPanel from '../components/SuggestionsPanel/SuggestionsPanel';
import TabGuide from '../components/TabGuide/TabGuide';

const UploadView = () => {
  const [resumeData, setResumeData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [jdText, setJdText] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [formError, setFormError] = useState('');

  const handleCheckScore = async () => {
    if (!jdText.trim()) {
      setFormError('Paste a job description first.');
      return;
    }
    if (!resumeFile) {
      setFormError('Upload your resume first.');
      return;
    }

    setFormError('');
    setIsAnalyzing(true);
    setAnalysisComplete(false);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      let resumeText = resumeFile.name;
      if (resumeFile.type === 'text/plain') {
        resumeText = await resumeFile.text();
      }

      const jdWords = new Set(
        jdText.toLowerCase().match(/\b[a-z]{3,}\b/g) || []
      );
      const resumeWords = new Set(
        resumeText.toLowerCase().match(/\b[a-z]{3,}\b/g) || []
      );
      const overlap = [...jdWords].filter(w => resumeWords.has(w)).length;
      const jdMatchScore = jdWords.size
        ? Math.min(95, Math.round(55 + (overlap / jdWords.size) * 40))
        : 72;

      const mockAnalysis = {
        overallScore: jdMatchScore,
        jdMatchScore,
        sections: {
          content: { score: jdMatchScore, feedback: 'Keyword overlap with the job description' },
          formatting: { score: 72, feedback: 'Good structure, could improve spacing' },
          skills: { score: Math.min(95, jdMatchScore + 5), feedback: 'Skills alignment vs. JD requirements' },
          experience: { score: Math.max(60, jdMatchScore - 8), feedback: 'Experience relevance to the role' }
        },
        suggestions: [
          'Mirror key phrases from the job description in your summary',
          'Add skills listed in the JD that you genuinely have',
          'Quantify achievements that match the role’s responsibilities',
          jdMatchScore < 75
            ? 'Several JD keywords are missing — tailor bullets for this role'
            : 'Strong JD alignment — fine-tune wording for ATS systems'
        ]
      };

      setResumeData(mockAnalysis);
      setAnalysisComplete(true);
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } catch (error) {
      console.error('Analysis failed:', error);
      setFormError('Something went wrong. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const canCheck = jdText.trim().length > 0 && resumeFile && !isAnalyzing;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TabGuide
          title="Upload Resume tab"
          purpose="Check how well your resume matches one job description."
          steps={[
            'Paste the full job description in the left box.',
            'Upload your resume on the right (TXT gives the most accurate demo score).',
            'Click the blue “Check match score” button below.',
            'Scroll down to see your match %, section scores, and suggestions.',
          ]}
          result="A match percentage plus tips to improve alignment with that JD. Your text and results stay here if you switch tabs and come back."
        />
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Match Resume to Job Description
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Paste the job description, upload your resume, then click the button below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
          <div>
            <label htmlFor="jd" className="block text-sm font-medium text-gray-700 mb-2">
              1. Job description
            </label>
            <textarea
              id="jd"
              rows={10}
              value={jdText}
              onChange={(e) => {
                setJdText(e.target.value);
                if (formError) setFormError('');
              }}
              placeholder="Paste the full job description here (title, requirements, responsibilities…)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          <div>
            <p className="block text-sm font-medium text-gray-700 mb-2">
              2. Your resume
            </p>
            <FileUpload
              onFileSelected={setResumeFile}
              isAnalyzing={isAnalyzing}
              placeholder="Upload resume (PDF, DOC, DOCX, TXT)…"
            />
          </div>
        </div>

        <div className="text-center mb-8">
          <button
            type="button"
            onClick={handleCheckScore}
            disabled={!canCheck}
            className="px-10 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600 transition-all duration-300 hover:shadow-xl"
          >
            {isAnalyzing ? 'Checking match…' : 'Check match score'}
          </button>
          {formError && (
            <p className="mt-3 text-sm text-red-600">{formError}</p>
          )}
          {!formError && !canCheck && !isAnalyzing && (
            <p className="mt-3 text-sm text-gray-500">
              Add both a job description and a resume to enable the button.
            </p>
          )}
        </div>

        {analysisComplete && resumeData && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                Resume ↔ Job description match
              </p>
              <p className="text-5xl font-bold text-blue-600 mt-2">
                {resumeData.jdMatchScore}%
              </p>
              <p className="text-gray-600 mt-2 max-w-xl mx-auto">
                Based on keyword and skills overlap with the pasted job description.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ScoreBreakdown
                overallScore={resumeData.overallScore}
                sections={resumeData.sections}
              />
              <SuggestionsPanel suggestions={resumeData.suggestions} />
            </div>
          </div>
        )}

        {isAnalyzing && (
          <div className="text-center py-8">
            <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-blue-600">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Comparing your resume to the job description…
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadView;
