# Web Development Final Project - Hustle Hubbub

Submitted by: **Debashrestha Nandi**

This web app: **Hustle Hubbub is a community forum platform that allows users to create, explore, and interact with posts about startups, side hustles, and business ideas. It encourages sharing, commenting, and upvoting creative ventures while providing tools to sort and search posts effectively.**

Time spent: **47 hours spent in total**

---

## Required Features

The following **required** functionality is completed:

- [x] **Web app includes a create form that allows the user to create posts**
  - Form requires users to add a post title
  - Forms should have the *option* for users to add: 
    - additional textual content
    - an image added as an external image URL
- [x] **Web app includes a home feed displaying previously created posts**
  - Web app must include home feed displaying previously created posts
  - By default, each post on the posts feed shows only the post's:
    - creation time
    - title 
    - upvotes count
  - Clicking on a post directs the user to a new page for the selected post
- [x] **Users can view posts in different ways**
  - Users can sort posts by either:
    -  creation time
    -  upvotes count
  - Users can search for posts by title
- [x] **Users can interact with each post in different ways**
  - The app includes a separate post page for each created post when clicked, where any additional information is shown, including:
    - content
    - image
    - comments
  - Users can leave comments underneath a post on the post page
  - Each post includes an upvote button on the post page. 
    - Each click increases the post's upvotes count by one
    - Users can upvote any post any number of times

- [x] **A post that a user previously created can be edited or deleted from its post pages**
  - After a user creates a new post, they can go back and edit the post
  - A previously created post can be deleted from its post page

---

## Optional Features

The following **optional** features are implemented:

- [x] Web app implements pseudo-authentication
  - Upon launching the web app, the user is assigned a random user ID associated with all posts and comments they make
  - Only the original user author of a post can update or delete it
- [x] Users can repost a previous post by referencing its post ID
  - On the post page of the new post, the referenced post is displayed and linked, creating a thread
- [x] Users can customize the interface
  - Posts are displayed with content and image toggles
- [x] Users can add more characteristics to their posts
  - Users can set tags like "Question" or "Opinion" while creating a post
  - Users can filter posts by tag on the home feed
- [x] Web app displays a loading animation whenever data is being fetched

---

## Additional Features

- [x] Added a responsive layout for mobile and desktop screens
- [x] Dark mode toggle for user-friendly browsing
- [x] Realtime post feed updates using Supabase subscriptions

---

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ScreenToGif  
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

---

## Notes

- Implementing post ownership with random user IDs was tricky to track across browser sessions.
- Ensuring referential integrity between posts and comments required redesigning some table structures.
- Styling dynamic content on the post detail page with conditional rendering took longer than expected.

---

## License

    Copyright 2025 Debashrestha Nandi

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
