import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const SNIPPETS = {
    cplusplus: {
        label: 'C++', color: '#659BD3', ext: 'cpp',
        code: `#include <algorithm>
#include <vector>

template <typename T>
auto flatten(std::vector<std::vector<T>> v) {
    std::vector<T> out;
    for (auto& row : v)
        out.insert(out.end(),
                   row.begin(), row.end());
    return out;
}`,
    },
    javascript: {
        label: 'JavaScript', color: '#F7DF1E', ext: 'js',
        code: `const pipe = (...fns) =>
  x => fns.reduce((v, f) => f(v), x);

const process = pipe(
  x => x * 2,
  x => x + 1,
  x => \`result: \${x}\`
);

console.log(process(5)); // "result: 11"`,
    },
    python: {
        label: 'Python', color: '#4B8BBE', ext: 'py',
        code: `from functools import cache

@cache
def fib(n: int) -> int:
    return n if n < 2 else fib(n-1) + fib(n-2)

primes = [n for n in range(2, 100)
          if all(n % i for i in range(2, n))]

print(fib(40), primes[:5])`,
    },
    react: {
        label: 'React', color: '#61DAFB', ext: 'tsx',
        code: `const useDebounce = (value, delay) => {
  const [debounced, set] = useState(value);

  useEffect(() => {
    const t = setTimeout(
      () => set(value), delay
    );
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
};`,
    },
    html5: {
        label: 'HTML5', color: '#E34F26', ext: 'html',
        code: `<article itemscope
  itemtype="https://schema.org/Article">
  <header>
    <h1 itemprop="headline">Title</h1>
    <time itemprop="datePublished"
          datetime="2026-04-22">
      April 22, 2026
    </time>
  </header>
  <section itemprop="articleBody">
    content here
  </section>
</article>`,
    },
    css3: {
        label: 'CSS3', color: '#1572B6', ext: 'css',
        code: `@property --angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

.glow {
  background: conic-gradient(
    from var(--angle),
    #0ea5e9, #8b5cf6, #0ea5e9
  );
  animation: spin 3s linear infinite;
}

@keyframes spin {
  to { --angle: 360deg; }
}`,
    },
    nodejs: {
        label: 'Node.js', color: '#339933', ext: 'js',
        code: `import { createServer } from 'http';
import { readFile } from 'fs/promises';

createServer(async (req, res) => {
  try {
    const body = await readFile(
      \`./public\${req.url}\`
    );
    res.writeHead(200).end(body);
  } catch {
    res.writeHead(404).end('Not found');
  }
}).listen(3000);`,
    },
    git: {
        label: 'Git', color: '#F05032', ext: 'sh',
        code: `# undo last commit, keep changes staged
git reset --soft HEAD~1

# stash only untracked files
git stash -u

# find commit that broke something
git bisect start
git bisect bad HEAD
git bisect good v1.0

# pretty log
git log --oneline --graph`,
    },
    github: {
        label: 'GitHub', color: '#f0f6fc', ext: 'yml',
        code: `name: CI
on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm test`,
    },
    docker: {
        label: 'Docker', color: '#2496ED', ext: 'dockerfile',
        code: `FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json .
RUN npm ci --only=production

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules .
COPY . .
EXPOSE 3000
USER node
CMD ["node", "index.js"]`,
    },
    bootstrap: {
        label: 'Bootstrap', color: '#7952B3', ext: 'html',
        code: `<div class="container-fluid">
  <div class="row g-3">
    <div class="col-md-8 col-lg-9">
      <main class="p-3 bg-dark rounded">
        content
      </main>
    </div>
    <div class="col-md-4 col-lg-3">
      <aside class="sticky-top pt-3">
        sidebar
      </aside>
    </div>
  </div>
</div>`,
    },
    dotnetcore: {
        label: '.NET', color: '#512BD4', ext: 'cs',
        code: `var app = WebApplication
    .CreateBuilder(args)
    .Build();

app.MapGet("/scores/{id}",
  async (int id, AppDb db) =>
    await db.Scores.FindAsync(id)
      is Score s
        ? Results.Ok(s)
        : Results.NotFound());

app.MapGet("/leaderboard",
  async (AppDb db) => await db.Scores
    .OrderByDescending(s => s.Value)
    .Take(10)
    .ToListAsync());

app.Run();`,
    },
    unity: {
        label: 'Unity', color: '#BBBBBB', ext: 'cs',
        code: `public class PlayerController : MonoBehaviour {
    [SerializeField] float speed = 5f;
    Rigidbody rb;

    void Start() =>
        rb = GetComponent<Rigidbody>();

    void FixedUpdate() {
        var h = Input.GetAxis("Horizontal");
        var v = Input.GetAxis("Vertical");
        rb.velocity =
            new Vector3(h, 0, v) * speed;
    }
}`,
    },
};

export const CodeSnippetPopup = ({ lang, onClose, anchorPos }) => {
    const snippet = SNIPPETS[lang];
    const [displayed, setDisplayed] = useState('');
    const [done, setDone] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        setDisplayed('');
        setDone(false);
        if (!snippet) return;
        let i = 0;
        const full = snippet.code;
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            i++;
            setDisplayed(full.slice(0, i));
            if (i >= full.length) {
                clearInterval(intervalRef.current);
                setDone(true);
            }
        }, 14);
        return () => clearInterval(intervalRef.current);
    }, [lang]);

    if (!snippet) return null;

    return (
        <>
            <div className="snippet-backdrop" onClick={onClose} />
            <div
                className="snippet-positioner"
                style={anchorPos ? (anchorPos.flip
                    ? { bottom: anchorPos.bottom, left: anchorPos.left }
                    : { top: anchorPos.top, left: anchorPos.left }
                ) : {}}
            >
                <motion.div
                    className="snippet-terminal"
                    style={{
                        borderColor: snippet.color + '55',
                        boxShadow: `0 0 40px ${snippet.color}14, 0 20px 60px rgba(0,0,0,0.95)`,
                    }}
                    initial={{ opacity: 0, y: anchorPos?.flip ? 12 : -12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: anchorPos?.flip ? 12 : -12, scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 340, damping: 28 }}
                >
                    <div className="snippet-header" style={{ borderBottomColor: snippet.color + '33' }}>
                        <span className="snippet-dot" style={{ backgroundColor: snippet.color }} />
                        <span className="snippet-filename">
                            {snippet.label.toLowerCase()}.{snippet.ext}
                        </span>
                        <button className="snippet-close" onClick={onClose} type="button">×</button>
                    </div>
                    <pre className="snippet-code">
                        {displayed}
                        {!done && (
                            <span
                                className="snippet-cursor"
                                style={{ backgroundColor: snippet.color }}
                            />
                        )}
                    </pre>
                </motion.div>
            </div>
        </>
    );
};

export const SNIPPET_KEYS = Object.keys(SNIPPETS);
