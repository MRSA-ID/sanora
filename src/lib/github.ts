export interface ContributionDay {
	date: string;
	count: number;
}

interface GitHubContributionsResponse {
	total: Record<string, number>;
	contributions: Array<{
		date: string;
		count: number;
		level: number;
	}>;
}

/**
 * Fetches the last year of GitHub contributions for a given username.
 * Falls back to an empty array if the network request or parsing fails.
 */
export async function getGitHubContributions(
	username = "MRSA-ID",
): Promise<ContributionDay[]> {
	try {
		const response = await fetch(
			`https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
		);

		if (!response.ok) {
			console.warn(
				`Failed to fetch GitHub contributions for ${username}: ${response.statusText}`,
			);
			return [];
		}

		const data: GitHubContributionsResponse = await response.json();

		return data.contributions.map((c) => ({
			date: c.date,
			count: c.count,
		}));
	} catch (error) {
		console.error(
			`Error fetching GitHub contributions for ${username}:`,
			error,
		);
		return [];
	}
}
