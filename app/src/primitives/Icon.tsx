import * as RemixIcon from "@remixicon/react"
import { useMemo } from "react";

export type IconProps = {
    remix: keyof typeof RemixIcon
}

export default function Icon({remix}: IconProps) {
    // eslint-disable-next-line import/namespace
    const Component = useMemo(() => RemixIcon[remix], [remix]);

    return <Component/>
}