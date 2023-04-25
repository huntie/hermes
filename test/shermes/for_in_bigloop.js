/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// RUN: %shermes -exec %s -- -gc-sanitize-handles=0 | %FileCheck --match-full-lines %s
// REQUIRES: !slow_debug

// This test took over 10 minutes with HandleSan, so -gc-sanitize-handles=0 is
// passed to reduce the chances of tests timing out.

// Large array (doesn't fit in single segment)
var a = []
for (var i = 0; i < 1000*1000; ++i) {
  a[i] = i;
}
var t = 0;
for (var p in a) {
  t += 1;
}
print(t);
//CHECK: 1000000