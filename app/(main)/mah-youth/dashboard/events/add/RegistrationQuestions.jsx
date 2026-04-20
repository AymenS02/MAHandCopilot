'use client';

import { forwardRef, useImperativeHandle, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const QUESTION_TYPES = [
  { value: 'text', label: 'Text' },
  { value: 'textarea', label: 'Paragraph' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'number', label: 'Number' },
  { value: 'date', label: 'Date' },
  { value: 'select', label: 'Dropdown' },
  { value: 'radio', label: 'Single choice' },
  { value: 'checkbox', label: 'Multiple choice' },
];

function createQuestion() {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  return {
    id,
    text: '',
    type: 'text',
    required: false,
    options: [],
  };
}

const RegistrationQuestions = forwardRef(function RegistrationQuestions(_, ref) {
  const [questions, setQuestions] = useState([]);

  useImperativeHandle(ref, () => ({
    getQuestions: () =>
      questions
        .filter((q) => q.text.trim())
        .map((q) => ({
          ...q,
          text: q.text.trim(),
          options: (q.options || []).filter((opt) => opt.text.trim()),
        })),
  }));

  const updateQuestion = (id, field, value) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const addOption = (questionId) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: [
                ...(q.options || []),
                { id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, text: '' },
              ],
            }
          : q
      )
    );
  };

  const updateOption = (questionId, optionId, text) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt) => (opt.id === optionId ? { ...opt, text } : opt)),
            }
          : q
      )
    );
  };

  const removeOption = (questionId, optionId) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? { ...q, options: q.options.filter((opt) => opt.id !== optionId) }
          : q
      )
    );
  };

  const requiresOptions = (type) => ['select', 'radio', 'checkbox'].includes(type);

  return (
    <div className="border-t border-gray-700 pt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Registration Questions</h2>
        <button
          type="button"
          onClick={() => setQuestions((prev) => [...prev, createQuestion()])}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/20 border border-accent/50 text-accent hover:bg-accent hover:text-white transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Question
        </button>
      </div>

      {questions.length === 0 ? (
        <p className="text-gray-400 text-sm">No custom questions added.</p>
      ) : (
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div key={question.id} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                <div className="lg:col-span-7">
                  <label className="block text-xs text-gray-400 mb-1">Question {index + 1}</label>
                  <input
                    type="text"
                    value={question.text}
                    onChange={(e) => updateQuestion(question.id, 'text', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-accent"
                    placeholder="Enter your question"
                  />
                </div>
                <div className="lg:col-span-3">
                  <label className="block text-xs text-gray-400 mb-1">Type</label>
                  <select
                    value={question.type}
                    onChange={(e) =>
                      updateQuestion(question.id, 'type', e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-accent"
                  >
                    {QUESTION_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="lg:col-span-2 flex items-end gap-2">
                  <label className="inline-flex items-center gap-2 text-sm text-gray-300">
                    <input
                      type="checkbox"
                      checked={question.required}
                      onChange={(e) =>
                        updateQuestion(question.id, 'required', e.target.checked)
                      }
                      className="w-4 h-4 rounded border-gray-600 text-accent focus:ring-accent"
                    />
                    Required
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setQuestions((prev) => prev.filter((q) => q.id !== question.id))
                    }
                    className="ml-auto p-2 rounded-lg bg-red-500/10 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {requiresOptions(question.type) && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-300">Options</p>
                    <button
                      type="button"
                      onClick={() => addOption(question.id)}
                      className="text-xs text-accent hover:text-accent-light"
                    >
                      + Add option
                    </button>
                  </div>
                  <div className="space-y-2">
                    {(question.options || []).map((option) => (
                      <div key={option.id} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={option.text}
                          onChange={(e) =>
                            updateOption(question.id, option.id, e.target.value)
                          }
                          className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-accent"
                          placeholder="Option text"
                        />
                        <button
                          type="button"
                          onClick={() => removeOption(question.id, option.id)}
                          className="p-2 rounded-lg bg-red-500/10 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default RegistrationQuestions;

