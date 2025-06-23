import { useState, useEffect, useRef } from "preact/hooks";
import "../App.css";
import { framerates } from "./video-rate.data";

function parseFps(val: string): number {
    const [num, denom] = val.split("/").map(Number);
    return denom ? num / denom : Number(val);
}

function FrameratePreviewBoxes({ steps, highlight, selected, mask }: Readonly<{ steps: number, highlight: number, selected: boolean, mask: boolean }>) {
    return (
        <div
            style={{
                width: 180,
                height: 40,
                border: "1px solid #ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: steps < 8 ? "flex-start" : "center",
                overflow: "hidden",
            }}
        >
            {Array.from({ length: steps }, (_, i) => {
                const boxWidth = Math.max(8, Math.floor((180 - steps * 2) / steps));
                const isHighlight = i === highlight;
                let background;
                let border;
                let margin = 1;
                if (isHighlight) {
                    background = selected ? "#d32f2f" : "#0078d4";
                    border = selected ? "2px solid #b71c1c" : "2px solid #333";
                } else if (mask) {
                    background = "#000";
                    border = "none";
                    margin = 0;
                } else {
                    background = i % 2 === 0 ? "#fff" : "#eee";
                    border = "1px solid #ccc";
                }
                return (
                    <div
                        key={i}
                        style={{
                            width: boxWidth,
                            height: 36,
                            display: "inline-block",
                            margin,
                            background,
                            border,
                            borderRadius: 3,
                            transition: "background 0.1s, border 0.1s",
                        }}
                    />
                );
            })}
        </div>
    );
}

function FramerateTimingGraph({ steps, highlight, selected, mask }: Readonly<{ steps: number, highlight: number, selected: boolean, mask: boolean }>) {
    return (
        <svg width={180} height={16} style={{ marginTop: 4, display: 'block' }}>
            {Array.from({ length: steps }, (_, i) => {
                const isHighlight = i === highlight;
                let color;
                if (isHighlight) {
                    color = selected ? "#d32f2f" : "#0078d4";
                } else if (mask) {
                    color = "#222";
                } else {
                    color = "#bbb";
                }
                return (
                    <rect
                        key={i}
                        x={(i * 180) / steps}
                        y={2}
                        width={Math.max(2, 180 / steps - 1)}
                        height={12}
                        fill={color}
                        rx={1}
                    />
                );
            })}
        </svg>
    );
}

export default function VideoRate() {
    const [selected, setSelected] = useState(framerates[0].label);
    const [frame, setFrame] = useState(0);
    const [mask, setMask] = useState(false);
    const intervalRef = useRef<number | null>(null);
    const masterFps = 60; // 60Hz master clock

    useEffect(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setFrame(0);
        intervalRef.current = window.setInterval(
            () => setFrame((f) => (f + 1) % masterFps),
            1000 / masterFps
        );
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    function getHighlightIdx(fps: number): number {
        if (!fps || isNaN(fps)) return 0;
        return Math.floor((frame * fps) / masterFps) % Math.round(fps);
    }

    return (
        <div>
            <h3>Video framerate</h3>
            <label style={{ display: "block", marginBottom: 12 }}>
                <input
                    type="checkbox"
                    checked={mask}
                    onChange={(e) => setMask(e.currentTarget.checked)}
                    style={{ marginRight: 6 }}
                />
                Silhouette (show all non-highlighted blocks as black)
            </label>
            <table>
                <thead>
                    <tr>
                        <th>Choice</th>
                        <th>Description</th>
                        <th>Preview</th>
                    </tr>
                </thead>
                <tbody>
                    {framerates.map((f) => {
                        const fps = parseFps(f.value);
                        const steps = Math.round(fps);
                        const highlight = getHighlightIdx(fps);
                        return (
                            <tr key={f.label}>
                                <td>
                                    <label style={{ cursor: "pointer", userSelect: "none" }}>
                                        <input
                                            type="radio"
                                            name="framerate"
                                            value={f.label}
                                            checked={selected === f.label}
                                            onChange={() => setSelected(f.label)}
                                            style={{ marginRight: 6 }}
                                        />
                                        {f.label} (
                                        <span style={{ userSelect: "none" }}>{f.value}</span>{" "}
                                        )
                                    </label>
                                </td>
                                <td>{f.desc}</td>
                                <td>
                                    {/* <FrameratePreviewBoxes steps={steps} highlight={highlight} selected={selected === f.label} mask={mask} /> */}
                                    <FramerateTimingGraph steps={steps} highlight={highlight} selected={selected === f.label} mask={mask} />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
