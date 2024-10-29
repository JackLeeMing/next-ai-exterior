import { Button } from 'antd'
function getFileExtension(filename: string) {
    // 使用正则表达式匹配文件名中的后缀
    var match = filename.match(/\.([^.]+)$/);
    return match ? match[1] : '';
}
export const Download = ({ imageUrl }: { imageUrl: string }) => {
    const onDownloadClick = async () => {
        // 使用 fetch 获取图片数据
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        // 创建一个临时 URL
        const url = window.URL.createObjectURL(blob);
        const parts = imageUrl.split('/')
        // 创建一个临时 <a> 标签来触发下载
        const a = document.createElement('a');
        a.href = url;
        const filename = parts[parts.length - 1];
        const suffix = getFileExtension(filename)
        a.download = `result_${Date.now()}.${suffix}`; // 指定下载后的文件名
        document.body.appendChild(a);
        a.click();
        // 清理
        a.remove();
        window.URL.revokeObjectURL(url);
    };

    return (
        <>
            <Button size='large' type='primary' onClick={onDownloadClick} style={{ width: 222, marginLeft: 10 }}>
                Download
            </Button>
        </>
    )
}