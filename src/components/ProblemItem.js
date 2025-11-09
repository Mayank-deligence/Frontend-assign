// ProblemItem.js
import React, { useState, useEffect } from 'react';
import API from '../api';

export default function ProblemItem({ problem, initialCompleted }) {
  const [completed, setCompleted] = useState(!!initialCompleted);

  useEffect(()=> {
    // optimistic UI already set; persist change
    const save = async () => {
      try {
        await API.post('/progress', { problemId: problem._id, completed });
      } catch(err){ console.error('save err', err); }
    };
    save();
  }, [completed,problem?._id]);

  return (
    <div className="problem-item" style={{ border:'1px solid #eee', padding:8, marginBottom:6 }}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div>
          <input type="checkbox" checked={completed} onChange={e=>setCompleted(e.target.checked)} />
          <strong style={{marginLeft:8}}>{problem.title}</strong>
          <span style={{ marginLeft: 8, fontSize:12 }}>({problem.level})</span>
        </div>
        <div style={{display:'flex', gap:8}}>
          {problem.leetcodeLink && <a href={problem.leetcodeLink} target="_blank" rel="noreferrer">LeetCode</a>}
          {problem.codeforcesLink && <a href={problem.codeforcesLink} target="_blank" rel="noreferrer">CF</a>}
          {problem.youtubeLink && <a href={problem.youtubeLink} target="_blank" rel="noreferrer">YouTube</a>}
          {problem.articleLink && <a href={problem.articleLink} target="_blank" rel="noreferrer">Article</a>}
        </div>
      </div>
    </div>
  );
}
