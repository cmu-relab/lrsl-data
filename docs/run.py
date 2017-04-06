#!/usr/bin/env python3
import csv

def main():
    state_laws = get_state_laws('./state_laws.csv')
    for state, law_filename in state_laws:
        print(state, law_filename)

def get_state_laws(state_laws_filename):
    with open(state_laws_filename, 'r') as state_laws_file:
        state_laws_reader = csv.reader(state_laws_file)
        header = next(state_laws_reader)
        return list(state_laws_reader)

if __name__ == '__main__':
    main()
