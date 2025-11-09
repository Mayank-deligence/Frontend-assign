import { useEffect, useState } from "react";
import API from "../api";

export default function Topics() {
  const [topics, setTopics] = useState([]);
  const [done, setDone] = useState(new Set()); // problemIds completed
  const [open, setOpen] = useState({});        // accordion open state

  useEffect(() => {
    (async () => {
      const [t, p] = await Promise.all([
        API.get("/topics"),
        API.get("/progress")
      ]);
      setTopics(t.data);
      setDone(new Set(p.data.filter(x => x.completed).map(x => String(x.problemId?._id || x.problemId))));
    })().catch(console.error);
  }, []);

  const toggle = async (problemId) => {
    const id = String(problemId);
    const next = new Set(done);
    const willComplete = !next.has(id);
    if (willComplete) next.add(id); else next.delete(id);
    setDone(next);
    try {
      await API.post("/progress", { problemId, completed: willComplete });
    } catch {
      // revert on failure
      if (willComplete) next.delete(id); else next.add(id);
      setDone(new Set(next));
    }
  };

  return (
    <div className="panel">
      <h2 className="title">Topics</h2>
      <p className="subtitle">Explore these exciting topics!</p>

      {topics.map((t) => {
        const key = String(t._id);
        const expanded = !!open[key];
        return (
          <div key={key} className="accordion">
            <button className="acc-head" onClick={()=>setOpen(s=>({ ...s, [key]: !expanded }))}>
              <span>{t.title}</span>
              <span className={`badge ${expanded ? 'open' : 'pending'}`}>{expanded ? 'Open' : 'Pending'}</span>
            </button>

            {expanded && (
              <div className="acc-body">
                <h3>Sub Topics</h3>
                <div className="table">
                  <div className="thead">
                    <div>Name</div><div>LeetCode Link</div><div>YouTube Link</div><div>Article Link</div><div>Level</div><div>Status</div>
                  </div>
                  {(t.problems || []).map(p => {
                    const pid = String(p._id);
                    const checked = done.has(pid);
                    return (
                      <div className="trow" key={pid}>
                        <div className="name">
                          <input type="checkbox" checked={checked} onChange={()=>toggle(pid)} />
                          <span>{p.title}</span>
                        </div>
                        <div><a href={p.leetcodeLink || '#'} target="_blank" rel="noreferrer">Practise</a></div>
                        <div><a href={p.youtubeLink || '#'} target="_blank" rel="noreferrer">Watch</a></div>
                        <div><a href={p.articleLink || '#'} target="_blank" rel="noreferrer">Read</a></div>
                        <div className={`level ${p.level?.toLowerCase()}`}>{p.level || '-'}</div>
                        <div className={`status ${checked ? 'done' : 'pending'}`}>{checked ? 'Done' : 'Pending'}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
