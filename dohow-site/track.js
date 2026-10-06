/* Learning path: animated educational videos with Canvas Commons (formerly Motion Canvas) */
const phases = [
  {
    title:'Groundwork: just enough TypeScript', short:'Groundwork', time:'3–5 hrs',
    goal:'Canvas Commons scenes are TypeScript generator functions. Learn only the language pieces you will actually use.',
    learn:['Variables, functions, arrow functions, objects and arrays','<code>import</code> / <code>export</code> between files','Basic type annotations like <code>createRef&lt;Circle&gt;()</code>','Generators: <code>function*</code>, <code>yield</code> and <code>yield*</code> — the heart of every animation'],
    practice:'Write a generator that counts down from 3, then a second generator that uses <code>yield*</code> to run the first one twice.',
    code:{label:'countdown.ts', src:
`function* countdown() {
  yield 3;
  yield 2;
  yield 1;
}

function* twice() {
  yield* countdown(); // run to completion…
  yield* countdown(); // …then run again
}

for (const n of twice()) console.log(n);`},
    done:'You can explain in one sentence what <code>yield*</code> does. (In Canvas Commons it means “play this animation until it finishes, then continue.”)'
  },
  {
    title:'Set up your studio', short:'Setup', time:'1 hr',
    goal:'Install the tools and get the live editor running on your machine.',
    learn:['Install Node.js (LTS) and a code editor such as VS Code','Scaffold a project with the official create script','Know the project layout: <code>src/project.ts</code> lists your scenes, <code>src/scenes/</code> holds them','Tour the editor: preview, timeline, inspector and the Render tab'],
    practice:'Create a project, start the dev server, open the URL it prints (usually <code>http://localhost:9000</code>), then change a color in the example scene and save.',
    code:{label:'terminal', src:
`npm init @canvas-commons@latest
cd my-lesson
npm install
npm start`},
    done:'Saving a file instantly updates the preview, and you can scrub the timeline back and forth.'
  },
  {
    title:'Your first scene', short:'First scene', time:'2–3 hrs',
    goal:'Put a shape on screen and animate it. Every lesson you make is just this, repeated with more care.',
    learn:['<code>makeScene2D</code> and the <code>view</code> it gives you','Adding nodes with JSX: <code>Circle</code>, <code>Rect</code>, <code>Txt</code>','Refs: <code>createRef</code> to grab a node and animate it later','Tweens: <code>node().prop(value, seconds)</code>'],
    practice:'Make a dot enter, slide across, change color, and shrink away. Then change every duration without looking at the example.',
    code:{label:'src/scenes/first.tsx', src:
`import {Circle, makeScene2D} from '@canvas-commons/2d';
import {createRef} from '@canvas-commons/core';

export default makeScene2D(function* (view) {
  const dot = createRef<Circle>();
  view.add(<Circle ref={dot} size={140} fill="#2b70ff" />);

  yield* dot().position.x(300, 1);   // move right over 1s
  yield* dot().fill('#ffb000', 0.6); // recolor
  yield* dot().scale(0, 0.5);        // shrink away
});`},
    done:'Your circle runs through its whole routine and you can retime it from memory.'
  },
  {
    title:'Animation vocabulary', short:'Vocabulary', time:'5–6 hrs',
    goal:'Learn the handful of building blocks that every polished explainer is made from.',
    learn:['Flow helpers: <code>all</code> (together), <code>chain</code> (one after another), <code>sequence</code> (staggered), <code>delay</code>, <code>waitFor</code>, <code>loop</code>','Easing: <code>easeInOutCubic</code>, <code>easeOutBack</code>, <code>linear</code> — motion feels designed instead of mechanical','Signals: <code>createSignal</code> and <code>createComputed</code> for values that drive other values','Positions are relative to the parent; <code>Layout</code> gives you flexbox for rows and columns'],
    practice:'Recreate a 5-second animated title card: the title rises in with a bounce, a bar grows underneath, a subtitle types in.',
    code:{label:'src/scenes/title.tsx (excerpt)', src:
`import {all, chain, waitFor, easeOutBack,
        createSignal} from '@canvas-commons/core';

yield* all(
  title().opacity(1, 0.6),
  title().y(0, 0.6, easeOutBack),
);
yield* waitFor(0.3);
yield* chain(
  bar().width(600, 0.8),
  subtitle().text('One idea at a time.', 0.8),
);

// A signal that other nodes can follow
const radius = createSignal(100);
view.add(<Circle size={() => radius() * 2} fill="#6da0ff" />);
yield* radius(200, 1); // the circle grows with it`},
    done:'You can choose between <code>all</code>, <code>chain</code> and <code>sequence</code> without guessing, and your motion uses easing on purpose.'
  },
  {
    title:'The educational toolkit', short:'Teaching tools', time:'4–6 hrs',
    goal:'Learn the components that turn animation into explanation: math, code, arrows, labels and images.',
    learn:['<code>Latex</code> for equations, <code>Code</code> for highlighted, animated source code','<code>Line</code> with <code>endArrow</code> and an animated <code>end</code> to “draw” arrows and paths','<code>Img</code> for diagrams and photos you have the rights to use','Visual language: 2–3 colors, one font, consistent sizes — highlight only what you are talking about'],
    practice:'Animate the Pythagorean theorem: draw a right triangle, label the sides, then reveal <code>a² + b² = c²</code>.',
    code:{label:'src/scenes/pythagoras.tsx (excerpt)', src:
`import {Latex, Line, makeScene2D} from '@canvas-commons/2d';
import {createRef} from '@canvas-commons/core';

export default makeScene2D(function* (view) {
  const eq = createRef<Latex>();
  const arrow = createRef<Line>();
  view.add(<>
    <Latex ref={eq} tex="a^2 + b^2 = c^2"
           fill="white" fontSize={64} y={-200} opacity={0} />
    <Line ref={arrow} points={[[-300, 100], [300, 100]]}
          stroke="#6da0ff" lineWidth={8} endArrow end={0} />
  </>);

  yield* eq().opacity(1, 0.8);
  yield* arrow().end(1, 1); // draw the arrow on
});`},
    done:'You have a short scene where every element on screen exists to explain something.'
  },
  {
    title:'Script & storyboard', short:'Script', time:'3–4 hrs',
    goal:'Plan the lesson before you animate it. Good educational videos are written first and animated second.',
    learn:['One learning objective: “After watching, the viewer can…”','List the prerequisites you assume — and link to them, DoHow style','Write the narration: speech runs at roughly 130–150 words per minute','Split the script into beats; each beat becomes a scene or a named timing event','Sketch a rough storyboard on paper — stick figures are fine'],
    practice:'Write a full script and beat sheet for a 2–3 minute explainer on a topic you already understand well.',
    code:{label:'beat-sheet.txt', src:
`OBJECTIVE  Viewer can explain why a² + b² = c²
ASSUMES    area of a square, right angles

BEAT 1  0:00  Hook: "Why does this formula work?"  -> intro
BEAT 2  0:15  Draw the triangle, label the sides   -> triangle
BEAT 3  0:45  Build a square on each side          -> squares
BEAT 4  1:30  Rearrange the pieces: the proof      -> proof
BEAT 5  2:10  Recap + what to learn next           -> outro`},
    done:'Someone could read your script aloud and it would already teach the idea without any visuals.'
  },
  {
    title:'Voiceover & timing', short:'Voiceover', time:'3–4 hrs',
    goal:'Record narration and lock every animation to the words that describe it.',
    learn:['Record in a quiet, soft-furnished room; any USB mic beats a laptop mic','Clean up in Audacity (free): noise reduction, normalize, export WAV','Add the audio track to your project so it plays under the timeline',"Use <code>waitUntil('event')</code>, then drag the event marker on the timeline to the exact spoken word"],
    practice:'Record your script, add it to the project, and sync at least five visual moments to specific words.',
    code:{label:'src/project.ts + a scene', src:
`// src/project.ts
import {makeProject} from '@canvas-commons/core';
import intro from './scenes/intro?scene';
import triangle from './scenes/triangle?scene';
import narration from '../audio/narration.wav';

export default makeProject({
  scenes: [intro, triangle],
  audio: narration,
});

// inside a scene
yield* waitUntil('show-hypotenuse');
yield* hyp().stroke('#ffb000', 0.4);`},
    done:'On playback, each visual lands within a few frames of the word that names it.'
  },
  {
    title:'Render & export', short:'Render', time:'1–2 hrs',
    goal:'Turn your project into a real video file.',
    learn:['Render tab: 1920×1080, 30 or 60 fps, pick an output folder','Exporters: image sequence (always works) or video via the FFmpeg plugin','Add the plugin in <code>vite.config.ts</code> if your template did not include it','Watch the whole render once at full screen before publishing'],
    practice:'Render your lesson to an MP4 with audio. If you exported frames, assemble them with FFmpeg or a free editor like DaVinci Resolve.',
    code:{label:'vite.config.ts + optional ffmpeg', src:
`// vite.config.ts
import {defineConfig} from 'vite';
import motionCanvas from '@canvas-commons/vite-plugin';
import ffmpeg from '@canvas-commons/ffmpeg';

export default defineConfig({
  plugins: [motionCanvas(), ffmpeg()],
});

# Assembling an image sequence yourself
# (adjust the file pattern to match your output)
ffmpeg -framerate 60 -i output/project/%06d.png \\
  -i audio/narration.wav -c:v libx264 -pix_fmt yuv420p \\
  -c:a aac -shortest lesson.mp4`},
    done:'You have an MP4 that plays correctly on your phone, with audio in sync from start to finish.'
  },
  {
    title:'Publish & improve', short:'Publish', time:'ongoing',
    goal:'Ship it, learn from real viewers, and make the next video faster.',
    learn:['Captions: you already have the script — turn it into an <code>.srt</code> file','Thumbnail: render a single strong frame from your own scene','Description: chapters for each beat, plus links to the prerequisites','Ask 3 people from your target audience where they got confused','Move reusable pieces (title card, labeled arrow, equation reveal) into your <code>snippets/</code> library'],
    practice:'Publish the video, collect feedback, and write a one-page “next time” list.',
    code:{label:'snippets/ (your growing toolkit)', src:
`snippets/
  TitleCard.tsx      // rise-in title + growing bar
  LabeledArrow.tsx   // arrow that draws on, label fades in
  EquationReveal.tsx // Latex, term by term
  palette.ts         // your 3 brand colors
  timing.ts          // your favorite durations and easings`},
    done:'The video is live and captioned, and your second one is already planned — reusing half the code from the first.'
  }
];

const phaseList = document.getElementById('phaseList');
const phasePanel = document.getElementById('phasePanel');
const progressText = document.getElementById('trackProgressText');
const progressBar = document.getElementById('trackProgressBar');
let activePhase = 0;
let donePhases = [];
try { donePhases = JSON.parse(localStorage.getItem('dohow-video-track')) || []; } catch(e) { donePhases = []; }

const escapeHtml = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const pad = n => String(n).padStart(2,'0');

function renderPhaseList(){
  phaseList.innerHTML = phases.map((p,i)=>`
    <li><button class="phase-btn${i===activePhase?' active':''}${donePhases.includes(i)?' done':''}" data-phase="${i}">
      <span class="phase-num">${donePhases.includes(i)?'✓':pad(i+1)}</span>
      <span class="phase-name"><b>${p.short}</b><small>${p.time}</small></span>
    </button></li>`).join('');
  progressText.textContent = `${donePhases.length} / ${phases.length}`;
  progressBar.style.width = `${donePhases.length/phases.length*100}%`;
}

function renderPhase(){
  const p = phases[activePhase];
  const isDone = donePhases.includes(activePhase);
  phasePanel.innerHTML = `
    <div class="modal-kicker">Phase ${pad(activePhase+1)} / ${p.time}</div>
    <h3>${p.title}</h3>
    <p class="phase-goal">${p.goal}</p>
    <div class="phase-cols">
      <div class="phase-block"><span>LEARN</span><ul>${p.learn.map(l=>`<li>${l}</li>`).join('')}</ul></div>
      <div class="phase-block"><span>PRACTICE</span><p>${p.practice}</p></div>
    </div>
    <div class="code-card"><div class="code-head"><span>${p.code.label}</span><button class="copy-btn" data-copy>Copy</button></div><pre><code>${escapeHtml(p.code.src)}</code></pre></div>
    <div class="phase-done"><span>YOU'RE DONE WHEN</span><p>${p.done}</p></div>
    <div class="phase-actions">
      <button class="outline-btn" data-step="-1" ${activePhase===0?'disabled':''}>← Previous</button>
      <button class="pill-btn${isDone?' is-done':''}" data-toggle-done>${isDone?'Completed ✓':'Mark phase complete'}</button>
      <button class="outline-btn" data-step="1" ${activePhase===phases.length-1?'disabled':''}>Next →</button>
    </div>`;
}

function selectPhase(i){ activePhase = Math.max(0, Math.min(phases.length-1, i)); renderPhaseList(); renderPhase(); }
function saveProgress(){ try { localStorage.setItem('dohow-video-track', JSON.stringify(donePhases)); } catch(e) {} }

phaseList.addEventListener('click', e=>{ const b=e.target.closest('[data-phase]'); if(b) selectPhase(Number(b.dataset.phase)); });
phasePanel.addEventListener('click', e=>{
  const step = e.target.closest('[data-step]');
  if(step){ selectPhase(activePhase + Number(step.dataset.step)); return; }
  if(e.target.closest('[data-toggle-done]')){
    const wasDone = donePhases.includes(activePhase);
    donePhases = wasDone ? donePhases.filter(x=>x!==activePhase) : [...donePhases, activePhase];
    saveProgress();
    selectPhase(!wasDone && activePhase < phases.length-1 ? activePhase+1 : activePhase);
    return;
  }
  const copy = e.target.closest('[data-copy]');
  if(copy && navigator.clipboard){
    navigator.clipboard.writeText(phases[activePhase].code.src).then(()=>{ copy.textContent='Copied'; setTimeout(()=>copy.textContent='Copy',1400); }).catch(()=>{});
  }
});

selectPhase(0);
