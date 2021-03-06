import $ from "jquery";
import Rx from "rxjs/Rx";
import { from } from "rxjs/observable/from";
import { of } from "rxjs/observable/of";
import { concatMap, delay, mergeMap, filter, reduce, map, flatMap, switchMap, exhaustMap, debounceTime } from "rxjs/operators";
import { printf, print, getGitHubUser, testPostData, clear, FakeWebSocket, http } from "./utils";

const { Observable, Subject, pipe, ReplaySubject, BehaviorSubject } = Rx;
const btn = $("#btn");

Observable.fromEvent(btnClear, "click").subscribe(() => {
  clear();
});

const source$ = from([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const sourceOf$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9);
const filterOutEvens = filter(x => x % 2);
const sum = reduce((acc, next) => acc + next, 0);
const doubleBy = x => map(value => value * x);

// PIPE
// FILTERS
// source$
//   .filter(x => x % 2)
//   .map(x => x * 2)
//   .scan((acc, next) => acc + next, 0)
//   .startWith(0)
//   .subscribe(console.log);

// LET
// source$
//   .let(filterOutEvens)
//   .let(doubleBy(2))
//   .let(sum)
//   .subscribe(console.log);

// PIPE
// source$
//   .pipe(
//     filterOutEvens,
//     doubleBy(2),
//     sum
//   )
//   .subscribe(console.log);

// PIPE UTIL
// const complicatedLogic = pipe(
//   filterOutEvens,
//   doubleBy(2),
//   sum
// );
// source$.let(complicatedLogic).subscribe(console.log);

// SUBJECTS
// const subject = new Subject();
// btn.bind("click", () => subject.next("click"));
// subject.subscribe(console.log);

// This is better, but use Observable.fromEvent(button, 'click')
// const clicks = new Observable(observer => {
//   const handler = e => observer.next(e);
//   btn.bind("click", handler);
//   return () => btn.unbind("click", handler);
// });
// clicks.subscribe(console.log);

// SUBJECT NOTIFY LIST
// const foo = x => console.log(x);
// const bar = x => console.log(x);

// const subject = new Subject();
// const sub1 = subject.subscribe(foo);
// const sub2 = subject.subscribe(bar);

// subject.next("hi there");
// sub1.unsubscribe();
// sub2.unsubscribe();

// SUBJECT MULTI CASTING SHARE
// const foo = x => console.log(x);
// const bar = x => console.log(x);

// const subject = new Subject();
// const observer1 = subject.subscribe(foo); // When you call subscribe with an observer on an Rx Subject, it will add that observer to an internal list of observers.
// const observer2 = subject.subscribe(bar);

// const tick$ = Observable.interval(1000);
// tick$.subscribe(subject);

// SUBJECT
// const subject = new Subject();
// subject.next("missed message from Subject");
// subject.subscribe(console.log);
// subject.next("hello from subject!");

// REPLAY SUBJECT
// const replaySubject = new ReplaySubject();
// replaySubject.next("hello from ReplaySubject!");
// replaySubject.next("hello from second event from ReplaySubject!");
// replaySubject.subscribe(console.log);
// replaySubject.next("hello from third event from ReplaySubject!");

// BEHAVIOR SUBJECT
// const behaviorSubject = new BehaviorSubject("hello initial value from BehaviorSubject");
// behaviorSubject.subscribe(console.log);
// behaviorSubject.next("hello again from BehaviorSubject");

// MAPPING
// const namesObservable = of('Pete', 'Paul');
// namesObservable.pipe(map(name => `${name} is awesome!`)).subscribe(console.log);

// NESTED OBSERVABLES
// ANYONE EVER USE THE FETCH API?
//const getNamesApi = Observable.fromPromise(fetch("http://localhost:3004/names")).flatMap(result => result.json());

// PROBLEM - [Object, Object]
// getNamesApi.pipe(map(name => http.getAwesomeMessagesObservable(name))).subscribe(result => console.log(`${result}`));

// SOLUTION - SUBSCRIBE TO INNER OBSERVABLE!
// getNamesApi.pipe(map(name => http.getAwesomeMessagesObservable(name))).subscribe(resultObservable => {
//   resultObservable.subscribe(console.log);
// });

// MERGE MAP
// getNamesApi.pipe(mergeMap(name => http.getAwesomeMessagesObservable(name))).subscribe(console.log);

// TYPEAHEAD
// const suggestions = document.querySelector(".suggestions");
// const input = document.querySelector(".typeaheadInput");

// const inputStream$ = Observable.fromEvent(input, "keyup").pipe(
//   map(e => e.target.value),
//   debounceTime(1500)
// );

// const suggestionsStream$ = inputStream$.pipe(
//   mergeMap(input => fetch(`https://api.datamuse.com/sug?s=${input}`)),
//   switchMap(result => result.json()),
//   map(keywords => keywords.map(key => key.word))
// );

// suggestionsStream$.subscribe(words => {
//   suggestions.innerText = words.join("\n");
// });
