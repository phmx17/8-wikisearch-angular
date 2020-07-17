const { fromEvent } = Rx;
const { map, pluck } = RxOperators;	// pick an operator and get funky with it

const input = document.createElement('input');
const container = document.querySelector('.container');
container.appendChild(input);

const observable = fromEvent(input, 'input')	// input = html element; 'input' = event
	.pipe(
    //(event => event.target.value),
    pluck('target', 'value'),	// this is new and better 
    map(value => parseInt(value)),
    map(value => {
      if (isNaN(value)) {
        throw new Error('Enter a number!');  // this goes directly to error() in observable.subscribe()
      }
      return value;
    })  
  )
observable.subscribe({
	next(value) {
  },
  error(err) {
    console.error('bad thing happened:', err.message)
  },
})
// this is specific to this tool; no need to have in real world
observable;


// video 197: alternative observable syntax
const { Observable } = Rx;
const { tap, share } = RxOperators;

// the Observable
const observable = new Observable((subscriber) => {
	// throw value 1 into pipeline flow and emit it
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  
   // nothing comes out after this
  subscriber.complete();
  
  // emit error and done
  //subscriber.error(new Error('dsfkjf')); 
  // those are the 3 states an observable can be in   
  
}).pipe(
  	tap(value => console.log('from tap:',value)),
  	share() 
	)
// the observable object ie.the Observer that comes after the pipe
observable.subscribe(
  (value) => console.log('got a value:', value),
  (err) => console.log('bad thing happened', err.message),
  () => console.log('observable is complete. No more values')  
);


observable.subscribe((value) => {
	console.log('From second subscribe', value);
});

// only here for this tool : https://out.stegrider.now.sh/
// new Observable (() => {});