import Link from "next/link";

export function SideBarLink({ text = null }) {

    return (
        <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            {text}
        </Link>
    );
}