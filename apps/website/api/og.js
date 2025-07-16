export default async function handler(req, res) {
    const { url } = req.query;
    if (!url || typeof url !== 'string') {
      res.status(400).json({ error: 'url query parameter is required' });
      return;
    }
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      const html = await response.text();
  
      const extract = (property) => {
        const metaTag = new RegExp(`<meta[^>]+(?:property|name)=\"${property}\"[^>]*content=\"([^\"]+)\"`, 'i');
        const match = html.match(metaTag);
        return match ? match[1] : null;
      };
  
      const title = extract('og:title') || extract('title');
      const description = extract('og:description') || extract('description');
      const image = extract('og:image');
  
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).json({ title, description, image });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch og tags' });
    }
  }