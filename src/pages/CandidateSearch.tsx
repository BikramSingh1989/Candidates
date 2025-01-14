import React, { useState, useEffect } from "react";

interface Candidate {
  id: number;
  name: string;
  username: string;
  location: string;
  avatar: string;
  email: string;
  company: string;
  bio: string;
}

const mockCandidates: Candidate[] = [
  {
    id: 1,
    name: "Nancy",
    username: "StarryCoder",
    location: "India",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTjdlLN2KqDAhNK1f7VPKLuEk0Zl2V4YUPXw&s",
    email: "Nancyhouse@gmail.com",
    company: "Google",
    bio: "Senior coder analyst at Google!",
  },
  {id: 2,
    avatar: 'data:image/jpeg;base64,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',
    name: 'Roger Smith',
    username: 'RSmith10',
    location: 'Langley, USA',
    email: 'rogersmith10@gmail.com',
    company: 'Microsoft',
    bio: 'Years of experience, more in resume.',
  },
  {id: 3,
    avatar: 'data:image/jpeg;base64,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',
    name: 'Beth Allen',
    username: 'BethAllen1988',
    location: 'Canada',
    email: 'ballen15@gmail.com',
    company: 'Bell',
    bio: 'Long time coder for company',
  },
  {id: 4,
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZv8oMiKv7_qFQvzayLwUZ8Gz2QSU3smv5Ig&s',
    name: 'Lisa Coding',
    username: 'LisaaaaC',
    location: 'Austin, TX',
    email: 'lisaaaascoding@gmail.com',
    company: 'Self-Employed',
    bio: 'I run a coding bootcamp.',
  },
  {id: 5,
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdTT0dok_f1YY7pmOjgpi7l45CVcAvkl9LFQ&s',
    name: 'Tim Chen',
    username: 'TChen90',
    location: 'China',
    email: 'tchen90@gmail.com',
    company: 'reactors',
    bio: 'React based coding.',
  },
];

const CandidateSearch: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
    const saved = localStorage.getItem("savedCandidates");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(
    candidates[0] || null
  );

  useEffect(() => {
    localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
  }, [savedCandidates]);

  const handleSaveCandidate = () => {
    if (currentCandidate) {
      setSavedCandidates([...savedCandidates, currentCandidate]);
    }
    showNextCandidate();
  };

  const handleSkipCandidate = () => {
    showNextCandidate();
  };

  const showNextCandidate = () => {
    const nextCandidates = candidates.slice(1);
    setCandidates(nextCandidates);
    setCurrentCandidate(nextCandidates[0] || null);
  };

  return (
    <div
      className="candidate-search"
      style={{
        backgroundColor: "#0a043c",
        height: "100vh",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          borderBottom: "1px solid #ffffff",
        }}
      >
        <h1 style={{ fontSize: "1.8rem", margin: 0 }}>Candidate Search</h1>
        <a
          href="/potential-candidates"
          style={{
            color: "#ffffff",
            textDecoration: "none",
            fontSize: "1rem",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            transition: "background-color 0.3s ease",
          }}
        >
          Potential Candidates
        </a>
      </header>

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {currentCandidate ? (
          <div style={{ textAlign: "center", width: "50%" }}>
            <img
              src={currentCandidate.avatar}
              alt="Candidate"
              style={{ width: "100%", borderRadius: "1rem" }}
            />
            <div
              style={{
                marginTop: "1rem",
                padding: "1rem",
                backgroundColor: "#000000",
                borderRadius: "0.5rem",
              }}
            >
              <h2>
                {currentCandidate.name}{" "}
                <span style={{ color: "#888888" }}>
                  ({currentCandidate.username})
                </span>
              </h2>
              <p>Location: {currentCandidate.location}</p>
              <p>
                Email:{" "}
                <a
                  href={`mailto:${currentCandidate.email}`}
                  style={{ color: "#ffffff" }}
                >
                  {currentCandidate.email}
                </a>
              </p>
              <p>Company: {currentCandidate.company}</p>
              <p>Bio: {currentCandidate.bio}</p>
            </div>
          </div>
        ) : (
          <p>No more candidates available to review.</p>
        )}

        {currentCandidate && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              marginTop: "2rem",
            }}
          >
            <button
              onClick={handleSkipCandidate}
              style={{
                backgroundColor: "#ff0000",
                border: "none",
                padding: "1rem 2rem",
                borderRadius: "0.5rem",
                color: "#ffffff",
              }}
            >
              -
            </button>
            <button
              onClick={handleSaveCandidate}
              style={{
                backgroundColor: "#00ff00",
                border: "none",
                padding: "1rem 2rem",
                borderRadius: "0.5rem",
                color: "#ffffff",
              }}
            >
              +
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default CandidateSearch;
