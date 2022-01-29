export class GithubUser {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    score: number;

    constructor(defaultValues: Partial<GithubUser> = {}) {
        Object.keys(defaultValues).forEach((key) => {
            this[key] = defaultValues[key];
        });
    }

    clone() {
        return new GithubUser(deepCopy(this));
    }
}

export function mapToGithubUser(data: unknown): GithubUser {
    return new GithubUser(data);
}
export function mapToGithubUsers(data: unknown[]): GithubUser[] {
    if (data.length) {
        const allData = data.map(mapToGithubUser);
        return allData;
    } else {
        return null;
    }
}

export function deepCopy<T>(o: T): T {
    return JSON.parse(JSON.stringify(o)) as T;
}