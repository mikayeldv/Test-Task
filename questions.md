Question 1

What is the difference between Component and PureComponent? give an
example where it might break my app.

Answer 

In React, a Component is a base class that all components inherit from. It implements the shouldComponentUpdate() 
lifecycle method with a default implementation that always returns true. This means that by default, a component 
will re-render whenever its props or state change, even if the new values are equal to the previous ones.
PureComponent is a subclass of Component that implements shouldComponentUpdate() 
with a shallow prop and state comparison. This means that a PureComponent will only re-render if its props or state
have changed and the new values are not equal to the previous ones.
PureComponent might break the app if using complex data structures as props or state.
shouldComponentUpdate() method will only do a shallow comparison, meaning it will only check if the reference to the array or object has changed, 
not if its contents have changed.This means that PureComponent will not re-render, even though it should.

Question 2

Context + ShouldComponentUpdate might be dangerous. Can think of why is
that?

Answer

Context is used to pass data through the component tree without manually passing props.
However, when the context changes, all components that consume that context will re-render, regardless of whether the change is relevant to them.
shouldComponentUpdate() is a method that determines whether a component should re-render based on changes to its props or state.
When useing shouldComponentUpdate() with context, we need to make sure that the component's rendering logic only depends on the relevant context data.
If the component relies on context data that is not relevant to its rendering logic, it might still re-render even if the context has not changed,
which can lead to unnecessary re-renders and performance issues.
Good example of this can be when we have Parent Component and inside it we have Context Provider which contains Child Component and HTML button element with onClick
function which changes state in every click and inside Child Component we have shouldComponentUpdate method which returns false which means that it will never re-render.
We may assume that by clicking in the button which updates state we should have re-render as Context has changed but shouldComponentUpdate() with return value of false will
not let our Child re-render and it can lead to unexpected behavior.

Question 3

Describe 3 ways to pass information from a component to its PARENT.

Answer

1. Callback functions
In this approach, the parent component passes a callback function to the child component as a prop then child component can call this 
function with any data it needs to pass to the parent. 
2.React.createRef()
In this approach, the parent component creates a ref object using the React.createRef() method and passes it to the child component as a prop then child component can update 
the ref object with any data it needs to pass to the parent.
3. Context
In this approach, the parent component creates a context object using the React.createContext() method and passes it to the child component as a prop then child component
can update the context object with any data it needs to pass to the parent.

Question 4

Give 2 ways to prevent components from re-rendering.

Answer

1. shouldComponentUpdate()
shouldComponentUpdate() is a lifecycle method in React class based Components. This method returns a Boolean value, which determines if the component should re-render or not. 
By default, shouldComponentUpdate() always returns true, which means that the component will always re-render whenever its props or state change.
2. React.memo()
React.memo() is a higher-order component that we can use to wrap a functional component. It works by caching the result of the component's render method and reusing it unless the component's props change.
React.memo() performs a shallow comparison of props, but we can provide a custom comparison function to perform a deep comparison if necessary.

Question 5

What is a fragment and why do we need it? Give an example where it might
break my app.

Answer

In React, a fragment is a way to group multiple elements together without adding extra nodes to the DOM. A fragment is essentially an empty element that doesn't render anything but can contain multiple child elements.
The case when it can break our app is when we have map function and inside it we use fragment to group elements. As we know React needs key attribute in case of having map but
fragment cant have the key attribute.

Question 6

Give 3 examples of the HOC pattern.

Answer

1. WithAuth HOC
A higher-order component that checks if a user is authenticated and redirects them to a login page if not. This HOC can be used to protect certain routes in an application that require the user to be logged in.
2. WithData HOC
A higher-order component that fetches data from an API and passes it down to a component as props. This HOC can be used to abstract away the data fetching logic from the component and reuse it across multiple components.
3. WithStyle HOC
A higher-order component that adds styling to a component. This HOC can be used to apply common styles to multiple components or to create reusable UI components with predefined styles.

Question 7

what's the difference in handling exceptions in promises, callbacks and
async...await.

Answer

1.Promise
In Promises, errors are handled using the .catch() method, which is called when a Promise is rejected. If an error occurs in the Promise chain, the error is propagated down to the next .catch() method in the chain.
If there is no .catch() method in the chain, the error is logged to the console
2.Callbacks
In Callbacks, errors are typically passed as the first argument to the callback function. The convention is to check the first argument for an error object and handle the error appropriately.
3.Async Await
In async...await, errors are handled using try...catch blocks. When an error occurs inside an async function, it throws an error, which can be caught using try...catch blocks.

Async Await makes error handling easier and more concise compared to Callbacks which can lead to callback hell and can make error handling more difficult as the number of nested callbacks increases and Promises.

Question 8

How many arguments does setState take and why is it async

Answer

SetState takes 2 arguments
1.An object containing one or more new state values
2.An optional callback function that is called after the state has been updated
setState() is asynchronous because React may batch multiple setState() calls for performance reasons. This means that calling setState() does not immediately update the component's state and rerender the component. 
Instead, React schedules the state update and re-rendering in the next event loop

Question 9

List the steps needed to migrate a Class to Function Component.

Answer

1.Rewrite Class Component as a Function Component with the same name. Remove this prefix from any references to state or props and remove dender method and move its content into function body.
2.If Class Component uses lifecycle methods convert them to their equivalent in a Function component. For example in case of these methods componentDidMount, componentDidUpdate, or componentWillUnmount useEffect hook can be used.
3.Use useState to manage State.

Question 10

List a few ways styles can be used with components.

Answer

1.Inline styles

<div style={{color:"red"}}>Hello world</div>

2.CSS classes

<div className="myClass">Hello world</div>

3.Style-component

const StyledDiv = styled.div`
  background-color: red;
  color: white;
`;
return <StyledDiv>Hello world</StyledDiv>;

4.CSS modules

import styles from './MyComponent.module.css';
<div className={styles.container}>Hello world</div>;

5.Third-party libraries (Material UI, Bootstrap, Semantic UI, AntD)

import { Button } from 'semantic-ui-react';
<Button>Hello world</Button>;

Question 11

How to render an HTML string coming from the server.

Answer

I can be done with the help of dangerouslySetInnerHTML prop
<div dangerouslySetInnerHTML={{ __html: htmlString }}></div>

It's important to note that using dangerouslySetInnerHTML can be risky as it can potentially expose your application to XSS attacks
