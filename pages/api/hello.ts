export default function handler(res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) {
    res.status(200).json({ message: "Hello, world!" });
}
