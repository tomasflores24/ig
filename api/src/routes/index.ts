import { Router } from 'express';
import { Feed, IgApiClient } from 'instagram-private-api';
const router = Router();

async function getAllItemsFromFeed<T>(feed: Feed<any, T>): Promise<T[]> {
  let items: any = [];
  do {
    items = items.concat(await feed.items());
  } while (feed.isMoreAvailable());
  return items;
}

router.get('/login', async (_req, res) => {
  const user_name: string = process.env.user_name || '';
  const password: string = process.env.password || '';
  try {
    const ig = new IgApiClient();
    ig.state.generateDevice(user_name);
    await ig.account.login(user_name, password);

    const followersFeed = ig.feed.accountFollowers(ig.state.cookieUserId);
    const followingFeed = ig.feed.accountFollowing(ig.state.cookieUserId);

    const followers = (await getAllItemsFromFeed(followersFeed)).map(
      ({ username }) => username
    );
    const following = (await getAllItemsFromFeed(followingFeed)).map(
      ({ username }) => username
    );

    const notFollowingYou = following.filter(
      (username) => !followers.includes(username)
    );


    return res.json({
      message: 'Login',
      followers,
      following,
      notFollowingYou,
    });
  } catch (error) {
    console.log('ERROR =>', error);
    return res.status(404).json({ message: 'Login ERROR', error });
  }
});

export default router;
