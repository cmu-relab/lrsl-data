#!/usr/bin/env python
# -*- coding: utf-8 -*-

from xml import sax

class HMDAHandler(sax.handler.ContentHandler):
    def parse(self, filename):
        self.text = []
        sax.parse(filename, self)
        return ''.join(self.text)

    def characters(self, data):
        self.text.append(data)

hmda_file = './CFR-2012-title12-vol8-part1003.xml'
result = HMDAHandler().parse(hmda_file)
print(result)
#TODO: Handle whitespaces?
