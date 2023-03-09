import { NgZone } from "@angular/core";
import { Observable, OperatorFunction } from "rxjs";

export function groupByKey<T extends Record<string, any>, K extends keyof T>(collection: Iterable<T>, key: K) {
  let groups = new Map<string, T[]>();
  for (let e of collection) {
    let g = (groups.get(e[key]) ?? []);
    g.push(e);
    groups.set(e[key], g);
  }
  return groups;
}

export function forEachToArray<T>(arg: { forEach: (callback: (e: T) => void) => void }): T[] {
  let elements: T[] = []
  arg.forEach(e => { elements.push(e); });
  return elements;
}

export function runInZone<T>(zone: NgZone): OperatorFunction<T, T> {
  return (source) => {
    return new Observable(observer => {
      const next = (value: T) => zone.run(() => observer.next(value));
      const error = (e: any) => zone.run(() => observer.error(e));
      const complete = () => zone.run(() => observer.complete());
      return source.subscribe({ next, error, complete });
    });
  };
}
