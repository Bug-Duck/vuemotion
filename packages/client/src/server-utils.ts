import fs from 'node:fs';
import path from 'node:path';

/**
 * 生成16位用户id
 */
const get_uid = (): (() => string) => {
  const uids = new Set();
  return (): string => {
    const uid1 = () => (Math.random() * 0xffff | 0).toString(16).padStart(4, '0');
    const uid = () => `${uid1()}${uid1()}${uid1()}${uid1()}`;
    let id = uid();
    while (uids.has(id)) {
      id = uid();
    }
    uids.add(id);
    return id;
  }
}

/**
 * 保存图片到临时文件夹
 * @param img 图片Base64编码
 * @param uid 用户id
 * @param pid 图片id
 */
const saveToTemp = (req: string, uid: string, pid: string) => {
  const tempDir = path.join(process.cwd(), '.vuemotion');
  const filePath = path.join(tempDir, `image_${uid}_${pid}.png`);

  const base64Data = req.replace(/^data:image\/\w+;base64,/, '');
  const dataBuffer = Buffer.from(base64Data, 'base64');

  try {
    fs.mkdirSync(tempDir);
  } catch { }

  fs.writeFileSync(filePath, dataBuffer);

  return filePath;
}

export { get_uid, saveToTemp };