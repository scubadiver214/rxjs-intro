import $ from 'jquery';
import Rx from 'rxjs/Rx';
import { printf, print } from './utils';

console.log('RxJS Boiler Running...');

//UNSUBSCRIBE - Forces an observable to complete. memory leaks, ongoing, etc.
//OBSERVABLE FROM SCRATCH REQUIRES NEW KEYWORD

/*
//OBSERVABLES FROM EVENTS
    const btn = $('#btn');
    const input = $('#input');
    const output = $('#output');
    const btnStream$ = Rx.Observable.fromEvent(btn, 'click');

    //1 return data from stream
    //2 errors
    //3 on complete
    btnStream$.subscribe(
        function(e){
            console.log(e.target.innerHTML);
        }, function(err){
            console.log('error');
        }, function(err){
            console.log('completed');
        }
    );

    const inputStream$ = Rx.Observable.fromEvent(input, 'keyup');
    inputStream$.subscribe(
        function(e){
            console.log(e.currentTarget.value);
            output.append(e.target.value);
        }, function(err){
            console.log('error');
        }, function(err){
            console.log('completed');
        }
    );

    const moveStream$ = Rx.Observable.fromEvent(document, 'mousemove');
    moveStream$.subscribe(
        function(e){
            output.html('<h1>X: ' + e.clientX + ' Y: ' + e.clientY + '</h1>');
        }, function(err){
            console.log('error');
        }, function(err){
            console.log('completed');
        }
    );
//OBSERVABLES FROM EVENTS

//OBSERVABLES FROM ARRAYS
    //create an observable sequence from these numbers
    const numbers = [33, 88, 44, 55, 99];
    const numbers$ = Rx.Observable.from(numbers);

    numbers$.subscribe(
        v => { console.log(v); },
        err => {console.log(err); },
        complete => {console.log('complete'); },
    );

    //we can use sets/maps - not just arrays

    //ARRAY
    const posts = [
        {title: 'post1', body: 'this is the body'},
        {title: 'post2', body: 'this is the body'},
        {title: 'post3', body: 'this is the body'}
    ];

    const posts$ = Rx.Observable.from(posts);

    posts$.subscribe(
        post => { 
            console.log(post);
            $('#posts').append('<li><h3>'+ post.title + '</h3><p>' + post.body + '</p></li>');
        },
        err => {console.log(err); },
        complete => {console.log('complete'); },
    );

    //SET
    const set = new Set(['Hello', 5, {title: 'this is a title'}]);
    const set$ = Rx.Observable.from(set);

    set$.subscribe(
        v => { 
            console.log(v);
        },
        err => {console.log(err); },
        complete => {console.log('complete'); },
    );

    //MAP
    const map = new Map([[1,2], [3,4]]);
    const map$ = Rx.Observable.from(map);

    map$.subscribe(
        v => { 
            console.log(v);
        },
        err => {console.log(err); },
        complete => {console.log('complete'); },
    );

//OBSERVABLES FROM ARRAYS

//OBSERVABLES FROM SCRATCH
    const source$ = new Rx.Observable(observer => {
        console.log('creating observable');
        observer.next('hello world');

        observer.error(new Error('some error'));

        setTimeout(() => {
            observer.next('yet another value.');
            observer.complete();
        }, 30000);
    });

    source$
    .catch(err => Rx.Observable.of(err))
    .subscribe(x => {
        console.log(x);
    }, err => {
        console.log(err);
    }, complete => {
        console.log('complete')
    });
//OBSERVABLES FROM SCRATCH

//OBSERVABLES FROM A PROMISE
    //Promise represents the result of an async operation

    const myPromise = new Promise((resolve, reject) => {
        console.log('creating promise');
        setTimeout(() => {
            resolve('hello from promise');
        }, 3000);
    });

    // myPromise.then(x => {
    //     console.log(x);
    // });
    
    // const sourceProimse$ = Rx.Observable.fromPromise(myPromise);

    // sourceProimse$.subscribe(x => {
    //     console.log(x);
    // });

    function getGitHubUser(userName){
        return $.ajax({
            url: 'https://api.github.com/users/' + userName,
            dataType: 'jsonp'
        }).promise();
    }

    // const inputSource$ = Rx.Observable.fromEvent($('#uName'), 'blur');

    // inputSource$.subscribe(e => {
    //     Rx.Observable.fromPromise(getGitHubUser(e.target.value))
    //     .subscribe(x => { 
    //         console.log(x);
    //     });
    // });

    // Rx.Observable.fromPromise(getGitHubUser('scubadiver214'))
    //     .subscribe(x => { 
    //         console.log(x);
    //     });
//OBSERVABLES FROM A PROMISE

//INTERVAL, TIMER & RANGE
    //Interval returns observable sequence, that returns a value after each period - good for testing and learning
    // const sourceInterval$ = Rx.Observable.interval(100)
    //       .take(5);

    //     sourceInterval$.subscribe(x => {
    //         console.log(x);
    //     }, err => { 
    //         console.log(err);
    //     }, complete => {
    //         console.log('complete');
    //     });

    //Timer
    // const sourceTimer$ = Rx.Observable.timer(5000, 1000)
    //     .take(5);

    //     sourceTimer$.subscribe(x => {
    //         console.log(x);
    //     }, err => { 
    //         console.log(err);
    //     }, complete => {
    //         console.log('complete');
    //     });

    //Range
    const sourceRange$ = Rx.Observable.range(25, 100);

        sourceRange$.subscribe(x => {
            //console.log(x);
        }, err => { 
            console.log(err);
        }, complete => {
            console.log('complete');
        });
//INTERVAL, TIMER & RANGE

//MAP AND PLUCK
    //map - applies a function to each item that is emitted by the source observable. 
    //returns an observable that emits the results of the function

    const sourceMap$ = Rx.Observable.interval(1000)
        .take(10)
        .map(v => v * 2);

    //sourceMap$.subscribe(v => console.log(v));

    const sourceMap2$ = Rx.Observable.from(['tom', 'saul', 'paul'])
        .map(x => x.toLocaleUpperCase())
        .map(v => 'I am ' + v);

    sourceMap2$.subscribe(v => console.log(v));

    Rx.Observable.fromPromise(getGitHubUser('scubadiver214'))
        .map(user => user.data.name)
        .subscribe(x => { 
            console.log(x);
        });

    //pluck - 
    const users = [
        {name: 'will', age: 34},
        {name: 'bob', age: 38},
        {name: 'jim', age: 48}
    ];

    const users$ = Rx.Observable.from(users)
        .pluck('name');

    users$.subscribe(x => console.log(x));
//MAP AND PLUCK

//MERGE AND CONCAT
    //Concat - runs right after another. 
    //Merge - runs together
    //.of turns anything you pass into an observable
    // Rx.Observable.of('Hello')
    //     .merge(Rx.Observable.of('everyone'))
    //     .subscribe(x => console.log(x));

    // Rx.Observable.interval(2000)
    //     .merge(Rx.Observable.interval(500))
    //     .take(25)
    //     .subscribe(x => console.log(x));

    // const source1$ = Rx.Observable.interval(2000).map(v => 'merge: ' + v);
    // const source2$ = Rx.Observable.interval(500).map(v => 'merge2: ' + v);

    // Rx.Observable.merge(source1$, source2$)
    //     .take(25)
    //     .subscribe(x => console.log(x));

    const source1$ = Rx.Observable.range(0, 5).map(v => 'merge: ' + v);
    const source2$ = Rx.Observable.range(6, 5).map(v => 'merge2: ' + v);

    Rx.Observable.concat(source1$, source2$)
        .take(25)
        .subscribe(x => console.log(x));
//MERGE AND CONCAT

//MERGEMAP & SWITCHMAP - avoid nest subscribes
    //example - what you don't want to do
    // Rx.Observable.of('Hello ')
    //     .subscribe(v => {
    //         Rx.Observable.of(v + 'everyone')
    //             .subscribe(x => console.log(x));
    //     });

    //use mergemap
    Rx.Observable.of('Hello ')
        .mergeMap(v => {
            return Rx.Observable.of(v + 'Everyone');
        })
        .subscribe(x => console.log(x));

    //SWITCHMAP
    const inputSource2$ = Rx.Observable.fromEvent($('#uName'), 'blur')
        .map(e => e.target.value)
        .switchMap(v => {
            return Rx.Observable.fromPromise(getGitHubUser(v))
        });

    inputSource2$.subscribe(x => console.log(x.data.name));
//MERGEMAP & SWITCHMAP 
*/

//COLD OBSERVABLE
const cold$ = Rx.Observable.create(observable => {
    observable.next(Math.random());
});

cold$.subscribe(a => console.log(`observable a: ${a}`));
cold$.subscribe(b => console.log(`observable b: ${b}`));
//COLD OBSERVABLE

//HOT OBSERVABLE
const x = Math.random();

const cold$ = Rx.Observable.create(observable => {
    observable.next(x);
});

cold$.subscribe(a => console.log(`observable a: ${a}`));
cold$.subscribe(b => console.log(`observable b: ${b}`));

// or 

const cold$ = Rx.Observable.create(observable => {
    observable.next(Math.random());
});

const hot$ = cold$.publish(); // only emit data once you call corresponding connect() method

hot$.subscribe(a => console.log(`observable a: ${a}`));
hot$.subscribe(b => console.log(`observable b: ${b}`));

hot$.connect();
//HOT OBSERVABLE