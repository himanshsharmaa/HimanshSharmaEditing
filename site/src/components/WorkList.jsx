import React, { useRef, useState, useEffect, useMemo } from 'react'

const defaultProjects = [
  {
    id: 1,
    title: 'Luxury Villa Ad',
    desc: 'Cinematic lifestyle video designed to increase bookings and elevate brand perception',
    video: 'Video-659.mp4',
    poster: 'poster-1.svg',
    client: 'Laurel Homes',
    year: 2024,
    tags: ['Brand Film', 'Cinematic']
  },
  {
    id: 2,
    title: 'Event Recap — Reel',
    desc: 'Fast-paced social edit built to maximize watch time and shares',
    video: 'Video-312.mp4',
    poster: 'poster-2.svg',
    client: 'Summit Live',
    year: 2023,
    tags: ['Social', 'Reel']
  },
  {
    id: 3,
    title: 'Clinic Walkthrough',
    desc: 'Cinematic walkthrough emphasizing trust and premium service',
    video: 'Step Inside Rennovaa Clinic _ Dermatology Excellence Unveiled _ Clinic Walkthrough(720P_HD).mp4',
    poster: 'poster-3.svg',
    client: 'Rennovaa Clinic',
    year: 2022,
    tags: ['Walkthrough', 'Commercial']
  }
]

export default function WorkList({ onPlay }) {
  const refs = useRef({})
  const [projects, setProjects] = useState(defaultProjects)
  const [activeInline, setActiveInline] = useState(null)
  const [mutedMap, setMutedMap] = useState({})
  const [selectedTag, setSelectedTag] = useState('All')
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({ title: '', video: '', poster: '', tags: '', client: '', desc: '' })
  const FILTER_LIMIT = 4

  useEffect(() => {
    let cancelled = false
    fetch('/assets/media.json')
      .then(r => { if (!r.ok) throw new Error('no media.json') ; return r.json() })
      .then(data => {
        if (cancelled) return
        if (data && Array.isArray(data.projects) && data.projects.length) {
          setProjects(data.projects)
        }
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  // derived top tags for filter UI (limit to most frequent tags)
  const tags = useMemo(() => {
    const counts = {}
    projects.forEach(p => {
      p.tags && p.tags.forEach(t => {
        counts[t] = (counts[t] || 0) + 1
      })
    })
    const sorted = Object.keys(counts).sort((a, b) => counts[b] - counts[a])
    const top = sorted.slice(0, FILTER_LIMIT)
    return ['All', ...top]
  }, [projects])

  useEffect(() => {
    if (!tags.includes(selectedTag)) setSelectedTag('All')
  }, [tags])

  const visibleProjects = useMemo(() => {
    if (!selectedTag || selectedTag === 'All') return projects
    return projects.filter(p => p.tags && p.tags.includes(selectedTag))
  }, [projects, selectedTag])

  const startEdit = (p) => {
    setEditingId(p.id)
    setEditForm({
      title: p.title || '',
      video: p.video || '',
      poster: p.poster || '',
      tags: (p.tags || []).join(', '),
      client: p.client || '',
      desc: p.desc || ''
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({ title: '', video: '', poster: '', tags: '', client: '', desc: '' })
  }

  const saveEdit = (id) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== id) return p
      return {
        ...p,
        title: editForm.title,
        video: editForm.video,
        poster: editForm.poster,
        tags: editForm.tags.split(',').map(t => t.trim()).filter(Boolean),
        client: editForm.client,
        desc: editForm.desc
      }
    }))
    cancelEdit()
  }


  // Auto-play/pause visible video thumbnails for performance
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target
        try {
          if (entry.isIntersecting) {
            el.play && el.play().catch(() => {})
          } else {
            el.pause && el.pause()
          }
        } catch (e) {}
      })
    }, { threshold: 0.4 })

    const els = Object.values(refs.current).filter(Boolean)
    els.forEach(el => {
      if (el && el.tagName && el.tagName.toLowerCase() === 'video') obs.observe(el)
    })

    return () => obs.disconnect()
  }, [projects, activeInline])

  const resolveAsset = (value, folder) => {
    if (!value) return null
    if (value.startsWith('http') || value.startsWith('/')) return value
    return encodeURI(`/assets/${folder}/${value}`)
  }

  const toggleInline = (p) => {
    const videoSrc = resolveAsset(p.video, 'videos')
    if (!videoSrc) return
    const v = refs.current[p.id]
    if (activeInline === p.id) {
      if (v) {
        v.pause()
        v.currentTime = 0
      }
      setActiveInline(null)
      return
    }

    setActiveInline(p.id)
    setTimeout(() => {
      const v2 = refs.current[p.id]
      if (v2) {
        try {
          v2.load()
          v2.play().catch(() => {})
        } catch (err) {}
      }
    }, 60)
  }

  const toggleMute = (p) => {
    const v = refs.current[p.id]
    if (v) {
      v.muted = !v.muted
      setMutedMap(prev => ({ ...prev, [p.id]: v.muted }))
    } else {
      setMutedMap(prev => ({ ...prev, [p.id]: !prev[p.id] }))
    }
  }

  const openFullscreen = (p) => {
    const v = refs.current[p.id]
    if (!v) return
    if (v.requestFullscreen) v.requestFullscreen()
    else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen()
  }

  return (
    <section id="work" className="container py-16 glass-section">
      <div className="max-w-content">
        <h2 className="text-2xl font-semibold">Selected Work</h2>

          <div className="mt-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              {tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => { setSelectedTag(tag); setActiveInline(null) }}
                  className={`text-sm px-3 py-1 rounded ${selectedTag === tag ? 'bg-yellow-500 text-black' : 'bg-white/5 text-gray-300'}`}
                  aria-pressed={selectedTag === tag}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">Showing {visibleProjects.length} / {projects.length}</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProjects.map((p) => {
              const posterSrc = resolveAsset(p.poster, 'posters') || '/assets/posters/poster-1.svg'
              const videoSrc = resolveAsset(p.video, 'videos')
              const hasVideo = !!videoSrc
              return (
                <article key={p.id} className="relative rounded overflow-hidden bg-black/60 group">
                  {hasVideo ? (
                    <video
                      ref={(el) => { refs.current[p.id] = el }}
                      className="w-full h-44 sm:h-40 object-cover bg-black"
                      muted
                      playsInline
                      loop
                      preload="metadata"
                      poster={posterSrc}
                      aria-label={`${p.title} preview`}
                    >
                      <source src={videoSrc} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    ) : (
                    <img src={posterSrc} alt={`${p.title} poster`} className="w-full h-44 sm:h-40 object-cover" loading="lazy" decoding="async" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  <div className="p-4">
                    {editingId === p.id ? (
                      <form onSubmit={(e) => { e.preventDefault(); saveEdit(p.id) }} className="space-y-3">
                        <div>
                          <label className="text-xs text-gray-300">Title</label>
                          <input className="w-full mt-1 p-2 rounded bg-black/80 border border-white/6" value={editForm.title} onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))} />
                        </div>
                        <div>
                          <label className="text-xs text-gray-300">Company</label>
                          <input className="w-full mt-1 p-2 rounded bg-black/80 border border-white/6" value={editForm.client} onChange={(e) => setEditForm(prev => ({ ...prev, client: e.target.value }))} />
                        </div>
                        <div>
                          <label className="text-xs text-gray-300">Short description</label>
                          <textarea rows={2} className="w-full mt-1 p-2 rounded bg-black/80 border border-white/6" value={editForm.desc} onChange={(e) => setEditForm(prev => ({ ...prev, desc: e.target.value }))} />
                        </div>
                        <div>
                          <label className="text-xs text-gray-300">Video filename</label>
                          <input className="w-full mt-1 p-2 rounded bg-black/80 border border-white/6" value={editForm.video} onChange={(e) => setEditForm(prev => ({ ...prev, video: e.target.value }))} />
                        </div>
                        <div>
                          <label className="text-xs text-gray-300">Poster filename</label>
                          <input className="w-full mt-1 p-2 rounded bg-black/80 border border-white/6" value={editForm.poster} onChange={(e) => setEditForm(prev => ({ ...prev, poster: e.target.value }))} />
                        </div>
                        <div>
                          <label className="text-xs text-gray-300">Tags (comma separated)</label>
                          <input className="w-full mt-1 p-2 rounded bg-black/80 border border-white/6" value={editForm.tags} onChange={(e) => setEditForm(prev => ({ ...prev, tags: e.target.value }))} />
                        </div>
                        <div className="flex gap-3">
                          <button type="submit" className="text-sm px-3 py-1 rounded bg-yellow-500 text-black">Save</button>
                          <button type="button" onClick={(e) => { e.preventDefault(); cancelEdit() }} className="text-sm px-3 py-1 rounded bg-white/5 text-gray-200">Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <>
                        {p.client && <div className="text-xs text-indigo-400 font-medium">{p.client}</div>}
                        <h3 className="text-lg font-semibold">
                          <button type="button" onClick={(e) => { e.preventDefault(); if (hasVideo) toggleInline(p) }} className="hover:underline text-white text-left" aria-label={`Preview ${p.title}`}>{p.title}</button>
                        </h3>
                        <p className="text-gray-400 mt-1 text-sm line-clamp-2">{p.desc}</p>
                        <div className="mt-3 flex items-center gap-2">
                          {p.tags && p.tags.map(tag => (
                            <span key={tag} className="text-xs text-gray-300 bg-white/3 px-2 py-1 rounded">{tag}</span>
                          ))}
                        </div>

                        <div className="mt-4 flex items-center gap-4">
                          <button
                            onClick={(e) => { e.preventDefault(); if (hasVideo) toggleInline(p) }}
                            className={`text-sm ${hasVideo ? 'text-gray-200 hover:underline' : 'text-gray-600 opacity-50 cursor-not-allowed'}`}
                            aria-label={`Preview ${p.title}`}
                            disabled={!hasVideo}
                          >
                            {activeInline === p.id ? 'Stop' : 'Preview'}
                          </button>

                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              if (!hasVideo) return
                              if (onPlay) onPlay({ src: videoSrc, poster: posterSrc, title: p.title, description: p.desc })
                            }}
                            className={`text-sm ${hasVideo ? 'text-gray-200 hover:underline' : 'text-gray-600 opacity-50 cursor-not-allowed'}`}
                            aria-label={`Watch ${p.title}`}
                            disabled={!hasVideo}
                          >
                            Watch
                          </button>

                          <button
                            onClick={(e) => { e.preventDefault(); if (hasVideo) toggleMute(p) }}
                            className={`text-sm ${hasVideo ? 'text-gray-200 hover:underline' : 'text-gray-600 opacity-50 cursor-not-allowed'}`}
                            aria-label={`Toggle mute for ${p.title}`}
                            disabled={!hasVideo}
                          >
                            {mutedMap[p.id] ? 'Unmute' : 'Mute'}
                          </button>

                          <button
                            onClick={(e) => { e.preventDefault(); if (hasVideo) openFullscreen(p) }}
                            className={`text-sm ${hasVideo ? 'text-gray-200 hover:underline' : 'text-gray-600 opacity-50 cursor-not-allowed'}`}
                            aria-label={`Fullscreen ${p.title}`}
                            disabled={!hasVideo}
                          >
                            Fullscreen
                          </button>

                          <a
                            href={videoSrc || '#'}
                            download
                            className={`text-sm ${hasVideo ? 'text-gray-200 hover:underline' : 'text-gray-600 opacity-50 cursor-not-allowed'}`}
                            aria-label={`Download ${p.title}`}
                            aria-disabled={!hasVideo}
                          >
                            Download
                          </a>

                          <button onClick={(e) => { e.preventDefault(); startEdit(p) }} className="text-sm text-gray-200 hover:underline">Edit</button>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Title, company and description shown when not editing */}
                  

                  {activeInline === p.id && hasVideo && (
                    <div className="mt-2 p-4">
                      <video
                        ref={(el) => { refs.current[p.id] = el }}
                        className="w-full rounded bg-black"
                        controls
                        preload="none"
                        poster={posterSrc}
                        muted={!!mutedMap[p.id]}
                      >
                        <source src={videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
