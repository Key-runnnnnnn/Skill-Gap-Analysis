const axios = require('axios');

const HACKERNEWS_API_BASE = 'https://hacker-news.firebaseio.com/v0';
const HACKERNEWS_TOP_STORIES = `${HACKERNEWS_API_BASE}/topstories.json`;
const HACKERNEWS_ITEM = `${HACKERNEWS_API_BASE}/item`;


const getTopStories = async (req, res) => {
  try {
    console.log('Fetching top stories from HackerNews...');

    const topStoriesResponse = await axios.get(HACKERNEWS_TOP_STORIES, {
      timeout: 10000
    });

    if (!topStoriesResponse.data || !Array.isArray(topStoriesResponse.data)) {
      return res.status(500).json({
        error: 'Failed to fetch stories',
        message: 'Invalid response from HackerNews API'
      });
    }

    const topStoryIds = topStoriesResponse.data.slice(0, 5);
    console.log('Top 5 story IDs:', topStoryIds);

    const storyPromises = topStoryIds.map(id =>
      axios.get(`${HACKERNEWS_ITEM}/${id}.json`, {
        timeout: 5000
      }).catch(error => {
        console.error(`Error fetching story ${id}:`, error.message);
        return null;
      })
    );

    const storyResponses = await Promise.all(storyPromises);

    const stories = storyResponses
      .filter(response => response && response.data)
      .map(response => {
        const story = response.data;
        return {
          id: story.id,
          title: story.title || 'No title',
          url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
          score: story.score || 0,
          by: story.by || 'unknown',
          time: story.time ? new Date(story.time * 1000).toISOString() : null,
          type: story.type || 'story',
          descendants: story.descendants || 0
        };
      });

    if (stories.length === 0) {
      return res.status(500).json({
        error: 'No stories found',
        message: 'Could not fetch any stories from HackerNews'
      });
    }

    res.json({
      count: stories.length,
      stories,
      timestamp: new Date().toISOString(),
      source: 'HackerNews API'
    });

  } catch (error) {
    console.error('HackerNews API Error:', error.message);
    res.status(500).json({
      error: 'Failed to fetch HackerNews stories',
      message: error.message
    });
  }
};

module.exports = {
  getTopStories
};
