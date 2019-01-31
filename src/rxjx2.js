import $ from "jquery";
import Rx from "rxjs/Rx";
import { from } from "rxjs/observable/from";
import { of } from "rxjs/observable/of";
import { concatMap, delay, mergeMap, filter, reduce, map } from "rxjs/operators";
import { printf, print, getGitHubUser, testPostData, clear, FakeWebSocket } from "./utils";

const { Observable, Subject, pipe, ReplaySubject } = Rx;
const btn = $("#btn");
const input = $("#input");
const output = $("#output");
const btnClear = $("#btnClear");

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
// const observer1 = subject.subscribe(foo);
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
