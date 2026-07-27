export interface HtmlFetcher {
  fetchHtml(url: string): Promise<string>;
}
