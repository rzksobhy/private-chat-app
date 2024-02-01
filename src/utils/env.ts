import "dotenv/config";

export const envKeys = ["PORT"] as const;

export type EnvKey = (typeof envKeys)[number];

export function isEnvKey(value: any): value is EnvKey {
    return envKeys.includes(value);
}

export function fromEnv(key: EnvKey): string | undefined {
    return process.env[key];
}

export function fromEnvOrThrow(key: EnvKey): string {
    const value = process.env[key];
    if (value === undefined) {
        throw new Error(`env key not found ${key}`);
    }

    return value;
}
