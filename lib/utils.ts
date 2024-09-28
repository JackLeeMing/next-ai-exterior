import { type ClassValue, clsx } from "clsx"
import type { GetProp, UploadProps } from 'antd';
import { twMerge } from "tailwind-merge"

export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

export function getInitials(name: string | null | undefined): string {
    if (!name) return '';

    const nameParts = name.split(' ');
    const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || '';
    const secondInitial =
        nameParts.length > 1 ? nameParts[1]?.charAt(0).toUpperCase() : '';

    return `${firstInitial}${secondInitial || firstInitial}`;
}
