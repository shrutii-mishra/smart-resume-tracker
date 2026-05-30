import React, { useState } from 'react';
import FileUpload from '../components/FileUpload/FileUpload';
import VersionChart from '../components/VersionChart/VersionChart';
import TabGuide from '../components/TabGuide/TabGuide';

const CompareView = () => {
  const [resumeVersions, setResumeVersions] = useState([]);
  const [pendingFile, setPendingFile] = useState(null);
  const [uploadKey, setUploadKey] = useState(0);
  const [isComparing, setIsComparing] = useState(false);
  const [formError, setFormError] = useState('');

  const handleAddVersion = async () => {
    if (!pendingFile) {
      setFormError('Upload a resume file first.');
      return;
    }

    setFormError('');
    setIsComparing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockAnalysis = {
        id: Date.now(),
        name: `Version ${resumeVersions.length + 1}`,
        file: pendingFile.name,
        overallScore: Math.floor(Math.random() * 30) + 70,
        sections: {
          content: { score: Math.floor(Math.random() * 30) + 70 },
          formatting: { score: Math.floor(Math.random() * 30) + 70 },
          skills: { score: Math.floor(Math.random() * 30) + 70 },
          experience: { score: Math.floor(Math.random() * 30) + 70 }
        },
        uploadDate: new Date().toISOString()
      };

      setResumeVersions(prev => [...prev, mockAnalysis]);
      setPendingFile(null);
      setUploadKey((k) => k + 1);
    } catch (error) {
      console.error('Analysis failed:', error);
      setFormError('Could not add version. Try again.');
    } finally {
      setIsComparing(false);
    }
  };

  const removeVersion = (id) => {
    setResumeVersions(prev => prev.filter(version => version.id !== id));
  };

  const canAdd = pendingFile && !isComparing;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TabGuide
          title="Compare tab"
          purpose="See which resume version scores highest side by side."
          steps={[
            'Upload one resume file in the box on the left.',
            'Click the green “Add version & score” button.',
            'Repeat for each version you want to compare (e.g. old vs new resume).',
            'Check the chart on the right for scores and section breakdown.',
          ]}
          result="A ranked comparison of overall scores. Versions you add stay in this tab when you navigate away and return."
        />

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Compare Resume Versions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload multiple resumes, score each one, then compare results in the chart.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Add a version
              </h2>
              <FileUpload
                key={uploadKey}
                onFileSelected={(file) => {
                  setPendingFile(file);
                  if (formError) setFormError('');
                }}
                isAnalyzing={isComparing}
                placeholder="Upload resume version…"
              />

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={handleAddVersion}
                  disabled={!canAdd}
                  className="w-full sm:w-auto px-8 py-3 bg-green-600 text-white text-base font-semibold rounded-xl shadow-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isComparing ? 'Scoring…' : 'Add version & score'}
                </button>
                {formError && (
                  <p className="mt-2 text-sm text-red-600">{formError}</p>
                )}
                {!formError && !pendingFile && (
                  <p className="mt-2 text-sm text-gray-500">
                    Upload a file, then click the button above.
                  </p>
                )}
              </div>
            </div>

            {resumeVersions.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Your versions ({resumeVersions.length})
                </h3>
                <div className="space-y-3">
                  {resumeVersions.map((version) => (
                    <div key={version.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{version.name}</p>
                        <p className="text-sm text-gray-500">{version.file}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-lg font-bold text-blue-600">
                          {version.overallScore}%
                        </span>
                        <button
                          type="button"
                          onClick={() => removeVersion(version.id)}
                          className="px-3 py-1 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
                          title="Remove version"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 min-h-[320px]">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Comparison chart
            </h2>
            {resumeVersions.length > 0 ? (
              <VersionChart versions={resumeVersions} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-sm max-w-xs mx-auto">
                  No versions yet. Upload a resume and click “Add version & score” to fill this chart.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareView;
