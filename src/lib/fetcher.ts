import { generateTokenList } from "@/utils/generateToken";

export async function fetchTokens() {
    return generateTokenList(100);
}

