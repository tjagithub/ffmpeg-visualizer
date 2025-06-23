export const framerates: ReadonlyArray<{
    readonly label: string;
    readonly value: string;
    readonly desc: string;
}> = [
    { label: "ntsc", value: "30000/1001", desc: "Standard NTSC framerate" },
    { label: "pal", value: "25/1", desc: "Standard PAL framerate" },
    { label: "qntsc", value: "30000/1001", desc: "Quarter NTSC" },
    { label: "qpal", value: "25/1", desc: "Quarter PAL" },
    { label: "sntsc", value: "30000/1001", desc: "Square NTSC" },
    { label: "spal", value: "25/1", desc: "Square PAL" },
    { label: "film", value: "24/1", desc: "Film" },
    { label: "ntsc-film", value: "24000/1001", desc: "NTSC Film" },
    { label: "slow-mo", value: "10/1", desc: "Slow Motion" },
] as const;
