import { useState, useEffect } from 'react';
import { api } from '../api';

function Submit() {
  const [currentStep, setCurrentStep] = useState(1);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    section: '',
    title: '',
    abstract: '',
    keywords: '',
    authorId: '',
    comments: '',
  });

  // File states
  const [manuscriptFile, setManuscriptFile] = useState(null);
  const [supplementaryFiles, setSupplementaryFiles] = useState([]);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const data = await api.getProfiles();
      setProfiles(data);
      if (data.length > 0) {
        setFormData((prev) => ({ ...prev, authorId: data[0].id }));
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  const steps = [
    { number: 1, title: 'Start', description: 'Start Submission' },
    { number: 2, title: 'Section', description: 'Select Section' },
    { number: 3, title: 'Metadata', description: 'Enter Metadata' },
    { number: 4, title: 'Upload', description: 'Upload Files' },
    { number: 5, title: 'Confirmation', description: 'Confirmation' },
  ];

  const sections = [
    { id: 'research', name: 'Research Article', description: 'Original research findings' },
    { id: 'review', name: 'Review Article', description: 'Comprehensive literature review' },
    { id: 'case', name: 'Case Report', description: 'Clinical case presentations' },
    { id: 'short', name: 'Short Communication', description: 'Brief research communications' },
    { id: 'letter', name: 'Letter to Editor', description: 'Letters and commentaries' },
  ];

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.createArticle({
        title: formData.title,
        abstract: formData.abstract,
        keywords: formData.keywords,
        author_id: formData.authorId,
      });
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting article:', error);
      alert('Failed to submit article. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);
    if (type === 'manuscript') {
      setManuscriptFile(files[0]);
    } else {
      setSupplementaryFiles([...supplementaryFiles, ...files]);
    }
  };

  const removeSupplementaryFile = (index) => {
    setSupplementaryFiles(supplementaryFiles.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      section: '',
      title: '',
      abstract: '',
      keywords: '',
      authorId: profiles[0]?.id || '',
      comments: '',
    });
    setManuscriptFile(null);
    setSupplementaryFiles([]);
    setSubmitSuccess(false);
  };

  // Success Screen
  if (submitSuccess) {
    return (
      <main className="submit-page">
        <div className="success-container">
          <div className="success-icon">✅</div>
          <h1>Submission Complete!</h1>
          <p>
            Thank you for submitting your manuscript to <strong>Asian Journal of Medicine and Health</strong>.
          </p>
          <div className="success-details">
            <h3>What happens next?</h3>
            <ol>
              <li>You will receive an email confirmation with your submission ID.</li>
              <li>The editorial team will review your submission.</li>
              <li>Your manuscript will be assigned to reviewers.</li>
              <li>You will be notified of the review decision.</li>
            </ol>
          </div>
          <div className="success-actions">
            <button className="btn btn-primary" onClick={resetForm}>
              Submit Another Article
            </button>
            <button className="btn btn-outline" onClick={() => window.location.href = '/'}>
              Return to Home
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="submit-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="page-header-content">
          <h1>Submit Article</h1>
          <p>Submit your manuscript to Asian Journal of Medicine and Health</p>
        </div>
      </section>

      <div className="submit-container">
        {/* Progress Steps */}
        <div className="progress-steps">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`step ${currentStep >= step.number ? 'active' : ''} ${
                currentStep === step.number ? 'current' : ''
              }`}
            >
              <div className="step-number">{step.number}</div>
              <div className="step-info">
                <span className="step-title">{step.title}</span>
                <span className="step-desc">{step.description}</span>
              </div>
              {step.number < 5 && <div className="step-line"></div>}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="step-content">
          {/* Step 1: Start */}
          {currentStep === 1 && (
            <div className="step-panel">
              <h2>Before You Begin</h2>
              <p className="step-intro">
                Please review the following information before starting your submission.
              </p>

              <div className="checklist-section">
                <h3>Submission Requirements</h3>
                <ul className="checklist">
                  <li>
                    <span className="check-icon">☐</span>
                    The manuscript has not been published elsewhere
                  </li>
                  <li>
                    <span className="check-icon">☐</span>
                    All authors have approved the submission
                  </li>
                  <li>
                    <span className="check-icon">☐</span>
                    The manuscript follows AJIM formatting guidelines
                  </li>
                  <li>
                    <span className="check-icon">☐</span>
                    All references are properly cited
                  </li>
                  <li>
                    <span className="check-icon">☐</span>
                    No identifying information in the manuscript (for blind review)
                  </li>
                </ul>
              </div>

              <div className="info-box">
                <h4>📋 Submission Guidelines</h4>
                <ul>
                  <li>Articles must be written in English or Bahasa Indonesia</li>
                  <li>Word count: 3,000 - 8,000 words (excluding references)</li>
                  <li>Abstract: 200-300 words</li>
                  <li>Minimum 15 references for research articles</li>
                </ul>
              </div>

              <div className="info-box info-warning">
                <h4>⚠️ Copyright Notice</h4>
                <p>
                  By submitting your manuscript, you agree to the terms of the Creative Commons
                  Attribution-NonCommercial 4.0 License.
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Section Selection */}
          {currentStep === 2 && (
            <div className="step-panel">
              <h2>Select Article Section</h2>
              <p className="step-intro">
                Choose the most appropriate section for your manuscript.
              </p>

              <div className="sections-grid">
                {sections.map((section) => (
                  <label
                    key={section.id}
                    className={`section-card ${formData.section === section.id ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="section"
                      value={section.id}
                      checked={formData.section === section.id}
                      onChange={(e) =>
                        setFormData({ ...formData, section: e.target.value })
                      }
                    />
                    <div className="section-content">
                      <h4>{section.name}</h4>
                      <p>{section.description}</p>
                    </div>
                    <span className="check-circle">✓</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Metadata */}
          {currentStep === 3 && (
            <div className="step-panel">
              <h2>Enter Metadata</h2>
              <p className="step-intro">
                Provide the title, abstract, and keywords for your manuscript.
              </p>

              <div className="form-group">
                <label htmlFor="title">
                  Title <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter manuscript title"
                />
              </div>

              <div className="form-group">
                <label htmlFor="abstract">
                  Abstract <span className="required">*</span>
                </label>
                <textarea
                  id="abstract"
                  rows={8}
                  value={formData.abstract}
                  onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                  placeholder="Enter abstract (200-300 words)"
                />
                <span className="char-count">
                  {formData.abstract.length} characters
                </span>
              </div>

              <div className="form-group">
                <label htmlFor="keywords">
                  Keywords <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="keywords"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  placeholder="Enter keywords separated by commas (e.g., diabetes, hypertension, cardiology)"
                />
                <span className="help-text">
                  Enter 3-6 keywords, separated by commas
                </span>
              </div>

              <div className="form-group">
                <label htmlFor="author">
                  Submitting Author <span className="required">*</span>
                </label>
                <select
                  id="author"
                  value={formData.authorId}
                  onChange={(e) => setFormData({ ...formData, authorId: e.target.value })}
                >
                  {profiles.map((profile) => (
                    <option key={profile.id} value={profile.id}>
                      {profile.full_name} - {profile.university_affiliation}
                    </option>
                  ))}
                </select>
                <span className="help-text">
                  Select the author submitting this manuscript
                </span>
              </div>
            </div>
          )}

          {/* Step 4: Upload */}
          {currentStep === 4 && (
            <div className="step-panel">
              <h2>Upload Files</h2>
              <p className="step-intro">
                Upload your manuscript and supplementary files.
              </p>

              <div className="upload-section">
                <div className="upload-card">
                  <div className="upload-header">
                    <h4>📄 Manuscript File</h4>
                    <span className="required">*</span>
                  </div>
                  <div
                    className={`upload-zone ${manuscriptFile ? 'has-file' : ''}`}
                    onClick={() => document.getElementById('manuscript-input').click()}
                  >
                    {manuscriptFile ? (
                      <div className="file-info">
                        <span className="file-icon">📄</span>
                        <div>
                          <strong>{manuscriptFile.name}</strong>
                          <span>{(manuscriptFile.size / 1024 / 1024).toFixed(2)} MB</span>
                        </div>
                        <button
                          className="remove-file"
                          onClick={(e) => {
                            e.stopPropagation();
                            setManuscriptFile(null);
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="upload-icon">📤</span>
                        <p>Click to upload or drag and drop</p>
                        <span className="upload-hint">DOC, DOCX, PDF (Max 10MB)</span>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    id="manuscript-input"
                    accept=".doc,.docx,.pdf"
                    onChange={(e) => handleFileChange(e, 'manuscript')}
                    hidden
                  />
                </div>

                <div className="upload-card">
                  <div className="upload-header">
                    <h4>📎 Supplementary Files</h4>
                    <span className="optional">(Optional)</span>
                  </div>
                  <div
                    className="upload-zone"
                    onClick={() => document.getElementById('supplementary-input').click()}
                  >
                    <span className="upload-icon">📤</span>
                    <p>Click to upload supplementary files</p>
                    <span className="upload-hint">Tables, figures, raw data, etc.</span>
                  </div>
                  <input
                    type="file"
                    id="supplementary-input"
                    accept=".zip,.rar,.pdf,.xlsx,.csv"
                    multiple
                    onChange={(e) => handleFileChange(e, 'supplementary')}
                    hidden
                  />

                  {supplementaryFiles.length > 0 && (
                    <div className="supplementary-list">
                      {supplementaryFiles.map((file, index) => (
                        <div key={index} className="supplementary-item">
                          <span className="file-icon">📎</span>
                          <span className="file-name">{file.name}</span>
                          <span className="file-size">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                          <button
                            className="remove-file"
                            onClick={() => removeSupplementaryFile(index)}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="info-box">
                <h4>📝 File Preparation Guidelines</h4>
                <ul>
                  <li>Use standard fonts (Times New Roman, Arial)</li>
                  <li>Double-space all text</li>
                  <li>Number pages consecutively</li>
                  <li>Include line numbers</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {currentStep === 5 && (
            <div className="step-panel">
              <h2>Review and Confirm</h2>
              <p className="step-intro">
                Please review your submission before finalizing.
              </p>

              <div className="confirmation-grid">
                <div className="confirmation-section">
                  <h4>Section</h4>
                  <p>{sections.find((s) => s.id === formData.section)?.name || '-'}</p>
                </div>

                <div className="confirmation-section">
                  <h4>Title</h4>
                  <p>{formData.title || '-'}</p>
                </div>

                <div className="confirmation-section full-width">
                  <h4>Abstract</h4>
                  <p>{formData.abstract || '-'}</p>
                </div>

                <div className="confirmation-section">
                  <h4>Keywords</h4>
                  <p>{formData.keywords || '-'}</p>
                </div>

                <div className="confirmation-section">
                  <h4>Author</h4>
                  <p>
                    {profiles.find((p) => p.id === formData.authorId)?.full_name || '-'}
                  </p>
                  <span className="sub-text">
                    {profiles.find((p) => p.id === formData.authorId)?.university_affiliation}
                  </span>
                </div>

                <div className="confirmation-section">
                  <h4>Manuscript File</h4>
                  <p>{manuscriptFile?.name || 'No file uploaded'}</p>
                </div>

                <div className="confirmation-section">
                  <h4>Supplementary Files</h4>
                  <p>
                    {supplementaryFiles.length > 0
                      ? `${supplementaryFiles.length} file(s) uploaded`
                      : 'No files uploaded'}
                  </p>
                </div>
              </div>

              <div className="confirmation-checkbox">
                <label>
                  <input type="checkbox" />
                  <span>
                    I confirm that all information provided is accurate and I agree to the{' '}
                    <a href="#">terms and conditions</a>.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="step-navigation">
            {currentStep > 1 && (
              <button className="btn btn-outline" onClick={handleBack}>
                ← Back
              </button>
            )}
            <div className="nav-spacer"></div>
            {currentStep < 5 ? (
              <button
                className="btn btn-primary"
                onClick={handleNext}
                disabled={
                  (currentStep === 2 && !formData.section) ||
                  (currentStep === 3 && (!formData.title || !formData.abstract || !formData.keywords))
                }
              >
                Continue →
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Complete Submission'}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Submit;
