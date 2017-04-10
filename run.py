#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from src.lrsl.data import get_state_laws, StateLaw

def main():
    state_laws_csv = './docs/state_laws.csv'
    state_laws_dir = './docs'
    state_laws = get_state_laws(state_laws_csv)
    for state, law_filename in state_laws:
        state_law = StateLaw(state, law_filename, state_laws_dir)
        #break

if __name__ == '__main__':
    main()
