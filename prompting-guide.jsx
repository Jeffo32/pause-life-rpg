const { useState } = React;

const sections = [
  {
    id: "context",
    label: "01 — Context",
    icon: "◈",
    color: "#E8C547",
    tagline: "Tell me who you are and what you're building",
    principles: [
      {
        title: "State your role / domain",
        bad: "Build me a dashboard",
        good: "I run Belvu Group — 3 hospitality venues. Build me a staff scheduling dashboard.",
        why: "I calibrate terminology, priorities, and tone to your world. Without context I default to generic."
      },
      {
        title: "Name your constraints upfront",
        bad: "Make me a React app",
        good: "React/Vercel app, single App.jsx file, no external state libraries, must work on mobile Safari.",
        why: "Half my rewrites happen because constraints surface after I've built the wrong thing."
      },
      {
        title: "State your end goal, not just the task",
        bad: "Write me copy for my app",
        good: "I'm pitching Life RPG to indie hackers. Write copy that sells the sovereignty angle, not gamification.",
        why: "I optimize for the stated goal. If you tell me the destination I'll choose the right route."
      }
    ]
  },
  {
    id: "scope",
    label: "02 — Scope",
    icon: "◉",
    color: "#4FC4CF",
    tagline: "Define the edges of what you want",
    principles: [
      {
        title: "Separate must-haves from nice-to-haves",
        bad: "Add a calendar, dark mode, notifications, maybe an AI assistant and export to PDF",
        good: "Must have: calendar view + shift assignment. Nice-to-have if easy: dark mode. Skip the rest.",
        why: "I'll build everything you list. Unlabeled scope = I treat it all as equal priority and bloat the output."
      },
      {
        title: "Tell me what NOT to change",
        bad: "Update the scheduling logic",
        good: "Update the scheduling logic. Don't touch the Square API integration or the noodle animation.",
        why: "You've told me this before — you hate losing working code in rewrites. Explicit exclusions protect it."
      },
      {
        title: "Give me the right level of zoom",
        bad: "Fix my app",
        good: "The shift-publish button throws a 400 from Square's API. Here's the error log. Fix only that.",
        why: "Vague scope = I guess. Specific scope = surgical fix, nothing breaks downstream."
      }
    ]
  },
  {
    id: "format",
    label: "03 — Format",
    icon: "◆",
    color: "#CF6BF5",
    tagline: "Tell me what output looks like when it's done",
    principles: [
      {
        title: "Specify the deliverable format",
        bad: "Explain how to do this",
        good: "Give me a step-by-step checklist I can paste into Notion. No prose, just the steps.",
        why: "I default to conversational prose. If you need a table, SOP, bullet list, or code — say so."
      },
      {
        title: "Set length expectations",
        bad: "Write a bio for me",
        good: "Write a 3-sentence bio for my Instagram. Punchy, no fluff, speaks to builders.",
        why: "Without a target I calibrate to 'enough' — which is often too long for your context."
      },
      {
        title: "Use delivery shorthand",
        bad: "Can you make this better?",
        good: "Rewrite this. One output only. Don't explain your changes.",
        why: "I explain by default. 'One output only, no commentary' saves you 3 paragraphs of overhead every time."
      }
    ]
  },
  {
    id: "iteration",
    label: "04 — Iteration",
    icon: "◎",
    color: "#F5876B",
    tagline: "How to give feedback that moves fast",
    principles: [
      {
        title: "Point to the exact location",
        bad: "The layout feels off",
        good: "The venue selector in the top-left — it stacks weird on mobile. Fix just that.",
        why: "Vague feedback = I guess what's wrong and often fix the wrong thing."
      },
      {
        title: "Describe the problem, not the solution",
        bad: "Change the button to blue",
        good: "The CTA isn't visible enough against the dark background. Fix that.",
        why: "You might be right about blue — or there's a better fix. Describing the problem gives me room to solve it properly."
      },
      {
        title: "Rate the last output before requesting changes",
        bad: "Do it again but better",
        good: "Structure: 9/10. Tone: 6/10 — too corporate, needs to sound more like me. Redo tone only.",
        why: "Scoring what worked vs. what didn't lets me preserve the wins and fix only the losses."
      }
    ]
  },
  {
    id: "power",
    label: "05 — Power Moves",
    icon: "✦",
    color: "#6BF5A8",
    tagline: "Advanced inputs that unlock my best outputs",
    principles: [
      {
        title: "Give me a reference to match",
        bad: "Write something engaging",
        good: "Match this tone: [paste example]. That level of directness and structure is the target.",
        why: "A concrete example beats any adjective. 'Punchy' means 10 different things. An example means one."
      },
      {
        title: "Tell me what you've already tried",
        bad: "Help me fix this bug",
        good: "Already tried: switching RFC timestamps, checking AEST offset, re-reading Square docs. Still 400.",
        why: "I won't waste your time re-suggesting things you've already ruled out."
      },
      {
        title: "Use the advisory mode trigger",
        bad: "What do you think?",
        good: "Advisory mode: give me your honest take on whether this idea is worth building, blind spots included.",
        why: "That phrase unlocks first-principles thinking, direct pushback, and no emotional cushioning. Use it when you want truth over agreement."
      }
    ]
  }
];

function PromptingGuide() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(null);

  const section = sections[active];

  return (
    React.createElement("div", {
      style: {
        minHeight: "100vh",
        background: "#0A0A0A",
        fontFamily: "'DM Mono', 'Courier New', monospace",
        color: "#E8E8E8",
        display: "flex",
        flexDirection: "column"
      }
    },
      /* Header */
      React.createElement("div", {
        style: {
          padding: "32px 28px 20px",
          borderBottom: "1px solid #1E1E1E"
        }
      },
        React.createElement("div", {
          style: { fontSize: "10px", letterSpacing: "4px", color: "#555", marginBottom: "8px" }
        }, "JEFFO × CLAUDE — INPUT SYSTEM"),
        React.createElement("h1", {
          style: {
            fontSize: "clamp(22px, 5vw, 36px)",
            fontWeight: 700,
            margin: 0,
            letterSpacing: "-1px",
            lineHeight: 1.1
          }
        },
          "How to Brief Me",
          React.createElement("br"),
          React.createElement("span", {
            style: { color: "#555", fontWeight: 400, fontSize: "0.6em" }
          }, "Better inputs → faster, sharper outputs")
        )
      ),

      /* Nav */
      React.createElement("div", {
        style: {
          display: "flex",
          overflowX: "auto",
          borderBottom: "1px solid #1E1E1E",
          padding: "0 28px",
          gap: "4px",
          scrollbarWidth: "none"
        }
      },
        sections.map((s, i) =>
          React.createElement("button", {
            key: s.id,
            onClick: () => { setActive(i); setExpanded(null); },
            style: {
              background: "none",
              border: "none",
              padding: "14px 12px",
              cursor: "pointer",
              fontSize: "11px",
              letterSpacing: "1px",
              color: active === i ? s.color : "#444",
              borderBottom: active === i ? `2px solid ${s.color}` : "2px solid transparent",
              marginBottom: "-1px",
              whiteSpace: "nowrap",
              transition: "color 0.15s",
              fontFamily: "inherit"
            }
          }, s.icon + " " + s.label)
        )
      ),

      /* Section Content */
      React.createElement("div", {
        style: { padding: "28px 28px 60px", flex: 1 }
      },
        React.createElement("div", {
          style: {
            fontSize: "12px",
            color: section.color,
            letterSpacing: "2px",
            marginBottom: "24px",
            textTransform: "uppercase"
          }
        }, section.tagline),

        React.createElement("div", {
          style: { display: "flex", flexDirection: "column", gap: "12px" }
        },
          section.principles.map((p, i) =>
            React.createElement("div", {
              key: i,
              onClick: () => setExpanded(expanded === i ? null : i),
              style: {
                background: expanded === i ? "#111" : "#0D0D0D",
                border: `1px solid ${expanded === i ? section.color + "44" : "#1E1E1E"}`,
                borderRadius: "8px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.2s"
              }
            },
              /* Row header */
              React.createElement("div", {
                style: {
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px"
                }
              },
                React.createElement("div", {
                  style: { display: "flex", alignItems: "center", gap: "14px" }
                },
                  React.createElement("span", {
                    style: {
                      width: "24px", height: "24px",
                      background: section.color + "22",
                      color: section.color,
                      borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "11px", fontWeight: 700, flexShrink: 0
                    }
                  }, i + 1),
                  React.createElement("span", {
                    style: { fontSize: "13px", fontWeight: 600, letterSpacing: "0.3px" }
                  }, p.title)
                ),
                React.createElement("span", {
                  style: {
                    color: "#444",
                    fontSize: "16px",
                    transform: expanded === i ? "rotate(45deg)" : "none",
                    transition: "transform 0.2s",
                    flexShrink: 0
                  }
                }, "+")
              ),

              /* Expanded content */
              expanded === i && React.createElement("div", {
                style: { padding: "0 20px 20px" }
              },
                /* Bad */
                React.createElement("div", { style: { marginBottom: "12px" } },
                  React.createElement("div", {
                    style: { fontSize: "9px", letterSpacing: "3px", color: "#F56B6B", marginBottom: "6px" }
                  }, "✕ WEAK INPUT"),
                  React.createElement("div", {
                    style: {
                      background: "#1A0E0E",
                      border: "1px solid #F56B6B22",
                      borderRadius: "6px",
                      padding: "12px 14px",
                      fontSize: "12px",
                      color: "#B88",
                      lineHeight: 1.6
                    }
                  }, '"' + p.bad + '"')
                ),

                /* Good */
                React.createElement("div", { style: { marginBottom: "12px" } },
                  React.createElement("div", {
                    style: { fontSize: "9px", letterSpacing: "3px", color: section.color, marginBottom: "6px" }
                  }, "✓ STRONG INPUT"),
                  React.createElement("div", {
                    style: {
                      background: section.color + "0D",
                      border: `1px solid ${section.color}33`,
                      borderRadius: "6px",
                      padding: "12px 14px",
                      fontSize: "12px",
                      color: "#DDD",
                      lineHeight: 1.6
                    }
                  }, '"' + p.good + '"')
                ),

                /* Why */
                React.createElement("div", {
                  style: {
                    fontSize: "11px",
                    color: "#666",
                    lineHeight: 1.7,
                    borderLeft: "2px solid #2A2A2A",
                    paddingLeft: "12px"
                  }
                }, p.why)
              )
            )
          )
        )
      ),

      /* Footer cheat row */
      React.createElement("div", {
        style: {
          position: "sticky",
          bottom: 0,
          background: "#0A0A0A",
          borderTop: "1px solid #1E1E1E",
          padding: "12px 28px",
          display: "flex",
          gap: "20px",
          overflowX: "auto",
          scrollbarWidth: "none"
        }
      },
        ["WHO you are", "WHAT changes", "WHAT stays", "FORMAT wanted", "CONSTRAINTS first"].map((t, i) =>
          React.createElement("div", {
            key: i,
            style: {
              fontSize: "10px",
              letterSpacing: "1.5px",
              color: "#444",
              whiteSpace: "nowrap"
            }
          },
            React.createElement("span", { style: { color: "#E8C547" } }, "▸"),
            " " + t
          )
        )
      )
    )
  );
}
