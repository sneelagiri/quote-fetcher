# React Homework

In this homework assignment, you will be creating a React app in which the quotes of the public "Quote Garden" API can be interactively explored.

## A quick note on plagiarism

**This is a formal evaluation!** You are supposed to make your homework individually. You are allowed to use any materials in the reader or on the internet, but you are NOT allowed to look at each other's code. ***Plagiarism is a violation of the Academy contract and is not in your best interest. Do not discuss the contents of the assignment with your fellow students.***

## How to make and submit your homework

- Put your homework project in a (public) GitHub repository, and send a link to that repository to [teachers@codaisseur.com](teachers@codaisseur.com) before Saturday 22:00. Without running into errors, we should be able to clone the repository, install the dependencies, and then run it with `npm run start`, as usual.
- You are allowed to leave `console.log`s and comments in your code, but please make your code reasonably indented/formatted, and remove unnecessary code. This will make your teachers happy :)
- Your teachers will also be happy if you make enough git commits. This way, we can see your progress. For example, committing after each step.

## Learning goals and some tips & tricks

For transparency and clarity, these are the learning goals we will be testing:

- Using `create-react-app`
- Creating components
- Composing components and passing them data via props
- Designing and managing component local state with `this.setState`
- Mapping over arrays of data in the `render()` method
- Using the `componentDidMount` lifecycle hook and fetching data from an API
- Lifting state to a parent component, and passing callback props to children

If this sounds like a large list, it is, and it's because you've learned a tremendous amount of things this week! Don't let it scare or overwhelm you though, you have seen all these things, and the homework exercise will guide you through the process. Also, half of the task of programming is to find the right resources. Don't hesitate to use the reader, Google (Stackoverlow), or the documentation links we provide below.

**TIP: Read the assignment carefully!** It is easy to accidentally deviate from an assignment, resulting in a frustrating homework experience. Taking the time to read the exercise can save you time and effort.

**TIP: Don't get stuck!** If you feel stuck, try taking a small walk, continuing on to a next step, or talking out loud about the problem you're facing (programmers call this "rubber-ducking"). Everybody can get stuck, but don't let it stop you.

## The homework exercise

### Step 1. Setting up

- Create a React app with `create-react-app`. Clean up `App.js` by removing everything inside the `<div className="App">` element.

### Step 2. Adding some components

In the next steps, we're going to be fetching our quotes from the [Quote Garden API](https://pprathameshmore.github.io/QuoteGarden/). But first, let's "hard-code" some of these quotes into the app.

- Create a component `QuoteSearcher`, and put some hard-coded quote data in its initial state, like so:

  ```js
  state = {
    quotes: [
      {
        "_id": "5d91b45d9980192a317c8acc",
        "quoteText": "Notice that the stiffest tree is most easily cracked, while the bamboo or willow survives by bending with the wind.",
        "quoteAuthor": "Bruce Lee"
      },
      {
        "_id": "5d91b45d9980192a317c8abe",
        "quoteText": "Give me six hours to chop down a tree and I will spend the first four sharpening the axe.",
        "quoteAuthor": "Abraham Lincoln"
      },
      {
        "_id": "5d91b45d9980192a317c8955",
        "quoteText": "Good timber does not grow with ease; the stronger the wind, the stronger the trees.",
        "quoteAuthor": "J. Willard Marriott"
      },
    ]
  }
  ```

  Compose a `QuoteSearcher` instance in the `App` component, so that we can look at it.
- Create a component `Quote`, that takes two props (the quote text and the quote author), and displays them. Show the quote first, and then the author, prepended by _"By:"_.
- Let the `QuoteSearcher` component map over the quotes in its state, and display each of them with the `Quote` component. Also, add a page title above this list. The result may look something like this (the choice of title and your styling does not matter):

  ![](https://p18.f3.n0.cdn.getcloudapp.com/items/bLupkln5/Image+2019-10-24+at+9.53.06+PM.png)

### Step 3. Fetching quotes from the API

Now, let's make the `QuoteSearcher` component dynamically fetch qutoes from the API. We will be using the "search" endpoint at `https://quote-garden.herokuapp.com/quotes/search/:keyword`. For example, here are the results for "tree": https://quote-garden.herokuapp.com/quotes/search/tree.

- Change the initial state of the `QuoteSearcher` component to have an empty list of quotes. That is,

  ```ts
  state = {
    quotes: []
  }
  ```

- Add the `componentDidMount` lifecycle method to the component, and in it add a `fetch` call to https://quote-garden.herokuapp.com/quotes/search/tree, to fetch all the quotes that contain the keyword "tree".
- When the data arrives, assign it (correctly) to component local state, so that the component automatically rerenders and displays all the found qoutes.
- Add an extra (boolean) state property called `fetching`, and (re-)assign it as necessary in `componentDidMount` so that the component knows when it is fetching data.
- In the `render()` method, use that state property to conditionally show a "Loading..." text instead of the quotes when fetching. The result may look something like this:

  ![](https://p18.f3.n0.cdn.getcloudapp.com/items/d5ubADlJ/Screen+Recording+2019-10-24+at+09.57+PM.gif)

### Step 4. Add a "like" / "dislike" feature to the quotes

You might like some quotes and dislike others. We're going to add a feature that records whether you do or do not. For this step, we've going to keep the state local to the `Quote` component.

- Add two `<button>`s, for example `:)` and `:(` or `like` and `dislike`, so that the page looks like this:

  ![](https://p18.f3.n0.cdn.getcloudapp.com/items/04uk2vJO/Image+2019-10-24+at+10.04.48+PM.png)

- By using a new property in component local state, and the `onClick` attribute of the buttons, make it so that a user can like or dislike a quote. This liking or disliking should change the way the quote looks. For example, you can use the `style` attribute, and conditionally apply some CSS styles, like so: `style={{ fontWeight: "bold" }}`.
- The result may look something like this:

  ![](https://p18.f3.n0.cdn.getcloudapp.com/items/wbue6LqB/Screen+Recording+2019-10-24+at+10.12+PM.gif)

### Step 5. Counting liked and disliked quotes

We want to count the number of quotes the user has liked and disliked. We want this to look something like this:

![](https://p18.f3.n0.cdn.getcloudapp.com/items/GGu0WyQo/Screen+Recording+2019-10-24+at+10.28+PM.gif)

This is not the easiest task, we'll need to "lift the likedness state up" to the `QuoteSearcher` component.

- The initial state property you used in the `Quote` component now has to be added to the quote object itself, after the quotes have been fetched, in `QuoteSearcher`. For example, by mapping over the fetch results, like so:

  ```ts
  data.results.map(quote => {
    return {
      ...quote,
      // your "likedness" property
    };
  })
  ```

- In the `render()` method of the `QuoteSearcher` component, calculate the total number of liked and disliked quotes. You probably want to use `filter` or `map` or `reduce` for this. Then, display these number at the top of the page. (See the example above.)

- Pass down extra props to the `Quote` components from the `QuoteSearcher` component: pass the `_id` of the quote, and your "likedness" property as well. This way, the `Quote` component knows "which quote it is" (with the `_id`), and whether it has been liked.

- Next, add a method `setLiked` to your `QuoteSearcher` component, and pass it down to the `Quote` components as a _callback prop_. For example, our example solution has a method like so:

  ```ts
  setLiked = (id, liked) => {
    console.log("hello!", id, liked);
    // update local state so that the
    //  quote with this id is liked
    //  or not liked
  }
  ```

  You're allowed to name the method differently, or add multiple methods, or pass different parameters. What matters is that the feature works, not exactly how you achieve this :)

  Also, it's often good to wait with implementing this kind of method until we can test it.

- Update your `Quote` component so that it uses the new props it gets to style it according to whether it is liked or not.

- Update your `Quote` component so that it calls the callback prop (and passes it the right parameter(s)) when the buttons are clicked.

- Now, implement your `setLiked` (or differently named) method(s), so that they update the local state of the `QuoteSearcher` component in the right way. (Setting the "likedness" property of the right quote.)

### Step 6. Searching for quotes

We're going to add a new feature: you can look for quotes by entering a keyword into an `<input />` field. This input field is going to be a "controlled component". It can be helpful to refer to the [React docs page](https://reactjs.org/docs/forms.html) on this subject.

- Add an input field to the top of the page. The input field will be a "controlled" component, which means that it reads its `value` from a property of component local state, and has an event listener attached to `onChange` that update that state property.

- Refactor the component so that the `fetch`ing logic which is in the `componentDidMount` method, is placed into a new method, for example called `search`. Also, make sure it uses the new state property for the search text instead of just "tree".

- Add a button with the text "Search!" right next to the input field. When the user clicks on the button, a new search should be performed.

- Make sure that the "Loading..." indicator works properly. It should show up every time a search is performed, but of course only while the search is being done, and afterwards not any more.

- The result may look something like this:

  ![](https://p18.f3.n0.cdn.getcloudapp.com/items/YEuvZJ04/Screen+Recording+2019-10-24+at+11.01+PM.gif)

### Step 7. Bonus / reparation points

We will primarily be grading your homework based on the previous steps, and according to the list of learning goals, above. However, you can make up for some shortcomings in these steps and/or score some bonus points by implementing one or more of the following feature-ideas. Some are easier, some are harder, but in no particular order:

1. The Quotes API tends to contains lots of duplicate quotes! Filter out these duplicate quotes for a better user experience.

2. Show a nice "error" message when no quotes can be found for some searched keyword.

3. Being able to add a new quote to the list. You can ask for a text + author, or just the text and then hard-code the author to be you!

4. At the top of the page, count the number of quotes and the number of distinct authors in the list of found quotes. There may be many quotes, but just a few authors they can be attributes to.