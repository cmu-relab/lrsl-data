#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import csv
import os
import sys
import string
import unicodedata

class StateLaw:
    _allowed_chars = set( ',()[]";:.-$§ \n' + "'"
                         + string.ascii_letters
                         + string.digits
                         #+ string.punctuation
                        )
    _replace_chars = {
        # Fancy quotes are annoyances
        #'“': '""',
        #'”': '""',
        #'’': "'",
        # And so are dashes
        #'—': '-',
        #'–': '-',
        #'‑': '-',
        # Manual inspection is hard - use Unicode Character Classes

        # Unicode initial and final punctuation classes
        # See: https://www.compart.com/en/unicode/category/Pi
        '\u2018': "'", # Left Single Quotation Mark
        '\u201B': "'", # Single High-reversed-9 Quotation Mark
        '\u201C': '"', # Left Double Quotation Mark
        '\u201F': '"', # Double High-reversed-9 Quotation Mark
        # See: https://www.compart.com/en/unicode/category/Pf
        '\u2019': "''", # Right Single Quotation Mark
        '\u201D': "''", # Right Double Quotation Mark

        # Unicode dash character class, as per:
        # https://www.compart.com/en/unicode/category/Pd
        '\u002D': '-', # Hyphen-minus
        '\u058A': '-', # Armenian Hyphen
        '\u05BE': '-', # Hebrew Punctuation Maqaf
        '\u1400': '-', # Canadian Syllabics Hyphen
        '\u1806': '-', # Mongolian Todo Soft Hyphen
        '\u2010': '-', # Hyphen
        '\u2011': '-', # Non-breaking Hyphen
        '\u2012': '-', # Figure Dash
        '\u2013': '-', # En Dash
        '\u2014': '-', # Em Dash
        '\u2015': '-', # Horizontal Bar
        '\u2E17': '-', # Double Oblique Hyphen
        '\u2E1A': '-', # Hyphen With Diaeresis
        '\u2E3A': '-', # Two-em Dash
        '\u2E3B': '-', # Three-em Dash
        '\u2E40': '-', # Double Hyphen
        '\u301C': '-', # Wave Dash
        '\u3030': '-', # Wavy Dash
        '\u30A0': '-', # Katakana-hiragana Double Hyphen
        '\uFE31': '-', # Presentation Form For Vertical Em Dash
        '\uFE32': '-', # Presentation Form For Vertical En Dash
        '\uFE58': '-', # Small Em Dash
        '\uFE63': '-', # Small Hyphen-minus
        '\uFF0D': '-', # Fullwidth Hyphen-minus

        # spaces are annoyances
        # https://www.cs.tut.fi/~jkorpela/chars/spaces.html
        '\u0020': ' ', # <Space> (SP)
        '\u00A0': ' ', # <No-break space> (NBSP)
        '\u1680': ' ', # Ogham Space Mark
        '\u180E': ' ', # Mongolian Vowel Separator No Width
        '\u2000': ' ', # En Quad (1 en = 1/2 em)
        '\u2001': ' ', # Em Quad (1 em = normally, the height of the font)
        '\u2002': ' ', # En Space (1 en = 1/2 em)
        '\u2003': ' ', # Em Space (1 em)
        '\u2004': ' ', # Three-per-em Space 1/3 em
        '\u2005': ' ', # Four-per-em Space 1/4 em
        '\u2006': ' ', # Six-per-em Space 1/6 em
        '\u2007': ' ', # Figure Space ("Tabular width" = the width of digits)
        '\u2008': ' ', # Punctuation Space ("The width of a period '.'")
        '\u2009': ' ', # Thin Space (1/5 em or sometimes 1/6 em)
        '\u200A': ' ', # Hair Space (Narrorwer than THIN SPACE)
        '\u200B': ' ', # Zero Width Space (Nominally no width, but may expand)
        '\u202F': ' ', # Narrow No-break Space (Narrower than NBSP or SP)
        '\u205F': ' ', # Medium Mathematical Space (4/18 em)
        '\u3000': ' ', # Ideographic (CJK characters) Space
        '\uFEFF': ' ', # Zero Width NBSP (invisible char)
        '\xa0': ' ',   # non-breaking space in Latin1 (ISO 8859-1)
        #This is a line separator char, but comes in as part of whitespace
        # between Utah's PAR_NUM and PAR_TITLE annotations
        # We assume manual preprocessing of lines, and replace it with space
        '\u2028': ' ',

        # Hawaii's legislative assembly has unicode name
        # TODO: Use unidecode module: http://stackoverflow.com/a/4162694/800207
        # >>> from unidecode import unidecode
        # >>> unidecode(u'ıöüç')
        # 'iouc'
        # The module should also be able to handle fancy quotes and other
        # annoyances as well. See:
        # https://github.com/avian2/unidecode/blob/master/unidecode/x020.py
        'å': 'a',
    }

    def __init__(self, state, filename):
        self.state = state
        self.filename = filename
        self.file = os.path.join(state, filename)
        if not os.path.exists(self.file):
            raise FileNotFoundError
        self.original_string = None
        with open(self.file, 'r') as law_file:
            self.original_string = law_file.read()
        if self.original_string:
            # clear up the document by replacing annoyances defined in
            # StateLaw._replace_chars class variable.
            self.document = ''.join(StateLaw._replace_chars.get(x,x)
                                    for x in self.original_string)
            # TODO: Use unidecode module maybe?
            #self.document = unicodedata.normalize('NFKD', self.original_string)
        else:
            raise ValueError('self.original_string is empty.')

        self.lines = self.document.splitlines()
        self.chars = set(self.document)
        print(self.chars - StateLaw._allowed_chars)
        #self.spaced_words = set(self.document.split())

    def __str__(self):
        return self.filename[:-4]

def main():
    state_laws = get_state_laws('./state_laws.csv')
    for state, law_filename in state_laws:
        state_law = StateLaw(state, law_filename)
        #break

def get_state_laws(state_laws_filename):
    with open(state_laws_filename, 'r') as state_laws_file:
        state_laws_reader = csv.reader(state_laws_file)
        header = next(state_laws_reader)
        return list(state_laws_reader)

if __name__ == '__main__':
    main()
