declare global {
	function gtag(command: 'js', date: Date): void;
	function gtag(command: 'config', targetId: string): void;
	function gtag(
		command: 'event',
		eventName: string,
		params?: Record<string, string | number | boolean | null | undefined>
	): void;
}

export {};
