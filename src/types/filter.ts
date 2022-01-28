import * as texture from "./texture";

export type filter = (textures: texture.texture[], ...args: any[]) => texture.texture;