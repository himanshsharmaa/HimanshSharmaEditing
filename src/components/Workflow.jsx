import React from 'react'

const steps = [
  { id: 1, title: 'Brief', desc: 'Project goals, target platform and key messages.' },
  { id: 2, title: 'Select & Log', desc: 'Choose best takes and create a short selects list.' },
  { id: 3, title: 'Rough Cut', desc: 'Create story and structure with pacing in focus.' },
  { id: 4, title: 'Feedback', desc: 'Client review and iteration.' },
  { id: 5, title: 'Color & Grade', desc: 'Cinematic color grading for mood and tone.' },
  { id: 6, title: 'Audio & Delivery', desc: 'Sound mix, final encode, and platform delivery.' }
]

export default function Workflow(){
  return (
    <section id="workflow" className="container py-16 glass-section">
      <div className="max-w-content">
        <h2 className="text-2xl font-semibold">Editing Workflow</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {steps.map(s => (
            <div key={s.id} className="p-4 bg-white/2 rounded">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-black font-bold">{s.id}</div>
                <div>
                  <h3 className="font-medium">{s.title}</h3>
                  <p className="text-gray-300 text-sm mt-1">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
