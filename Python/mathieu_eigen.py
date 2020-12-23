import numpy as np
import matplotlib.pyplot as plt

# Uses https://dlmf.nist.gov/28.6#i to estimate the eigenvalue for the interval bisectioin algorithm to find
# In order to have a good approximation for the interval where the root lies use the following to estimate the eigenvalue
# if q>i^2 or if i = 0 and q > 1 use https://dlmf.nist.gov/28.8.E1
# otherwise use https://dlmf.nist.gov/28.6.i


def interval(i, q, ab):

    q = float(q)

    if q > float(i ** 2) / 2.0 or (i == 0 and q > 1):

        h = np.sqrt(q)
        s = 2.0 * float(i) + 1.0

        asymp = -2.0 * (h ** 2)
        asymp = asymp + 2.0 * s * h
        asymp = asymp - ((s ** 2) + 1.0) / 8.0
        asymp = asymp - ((s ** 3) + 3.0 * s) / (128.0 * h)
        asymp = asymp - (5.0 * (s ** 4) + 34.0 * (s ** 2) +
                         9.0) / (4096.0 * (h ** 2))
        asymp = asymp - (33.0 * (s ** 5) + 410.0 * (s ** 3) +
                         405.0 * s) / (131071.0 * (h ** 3))
        asymp = asymp - (63.0 * (s ** 6) + 1269.0 * (s ** 4) +
                         2943.0 * (s ** 2) + 486.0) / (1048576.0 * (h ** 4))
        asymp = asymp - (527.0 * (s ** 7) + 15617.0 * (s ** 5) +
                         69001.0 * (s ** 3) + 41607.0) / (33554432.0 * (h ** 5))

    else:
        if ab == 'a' and i <= 6:
            if i == 0:
                asymp = -(q ** 2) / 2.0 + 7.0 * (q ** 4) / 128.0 - 29.0 * \
                    (q ** 6) / 2304.0 + 68687.0 * (q ** 8) / 18874386.0
            elif i == 1:
                asymp = 1.0 + q - (q ** 2) / 8.0 - (q ** 3) / 64.0 - (q ** 4) / 1536.0 + 11.0 * (q ** 5) / 36864.0 + \
                    49.0 * (q ** 6) / 589824.0 + 55.0 * (q ** 7) / \
                    9437184.0 - 83.0 * (q ** 8) / 35389440.0
            elif i == 2:
                asymp = 4.0 + 5.0 * (q ** 2) / 12.0 - 763.0 * (q ** 4) / 13824.0 + 1002401.0 * (
                    q ** 6) / 79626240.0 - 1669068401.0 * (q ** 8) / 458647142400.0
            elif i == 3:
                asymp = 9.0 + (q ** 2) / 16.0 + (q ** 3) / 64.0 + 13.0 * (q ** 4) / 20480.0 - 5.0 * (
                    q ** 5) / 16384.0 - 1961.0 * (q ** 6) / 23592960.0 - 609.0 * (q ** 7) / 104857600.0
            elif i == 4:
                asymp = 16.0 + (q ** 2) / 30.0 + 433.0 * (q ** 4) / \
                    864000.0 - 5701.0 * (q ** 6) / 2721600000.0
            elif i == 5:
                asymp = 25.0 + (q ** 2) / 48.0 + 11.0 * (q ** 4) / 774144.0 + \
                    (q ** 5) / 147456.0 + 37.0 * (q ** 6) / 891813888.0
            elif i == 6:
                asymp = 36.0 + (q ** 2) / 70.0 + 187.0 * (q ** 4) / \
                    43904000.0 + 6743617.0 * (q ** 6) / 92935987200000.0

        elif ab == 'b' and i <= 6:
            if i == 1:
                asymp = 1.0 - q - (q ** 2) / 8.0 + (q ** 3) / 64.0 - (q ** 4) / 1536.0 - 11.0 * (q ** 5) / 36864.0 + \
                    49.0 * (q ** 6) / 589824.0 - 55.0 * (q ** 7) / \
                    9437184.0 - 83.0 * (q ** 8) / 35389440.0
            elif i == 2:
                asymp = 4.0 - (q ** 2) / 12.0 + 5.0 * (q ** 4) / 13824.0 - 289.0 * \
                    (q ** 6) / 79626240.0 + 21391.0 * (q ** 8) / 458647142400.0
            elif i == 3:
                asymp = 9.0 + (q ** 2) / 16.0 - (q ** 3) / 64.0 + 13.0 * (q ** 4) / 20480.0 + 5.0 * (
                    q ** 5) / 16384.0 - 1961.0 * (q ** 6) / 23592960.0 + 609.0 * (q ** 7) / 104857600.0
            elif i == 4:
                asymp = 16.0 + (q ** 2) / 30.0 - 317.0 * (q ** 4) / \
                    864000.0 + 10049.0 * (q ** 6) / 2721600000.0
            elif i == 5:
                asymp = 25.0 + (q ** 2) / 48.0 + 11.0 * (q ** 4) / 774144.0 - \
                    (q ** 5) / 147456.0 + 37.0 * (q ** 6) / 891813888.0
            elif i == 6:
                asymp = 36.0 + (q ** 2) / 70.0 + 187.0 * (q ** 4) / \
                    43904000.0 - 5861633.0 * (q ** 6) / 92935987200000.0

        else:
            asymp = float(i ** 2)
            asymp = asymp + (q ** 2) / (2.0 * ((i ** 2) - 1.0))
            asymp = asymp + ((5.0 * (i ** 2) + 7.0) * (q ** 4)) / \
                (32.0 * (((i ** 2) - 1.0) ** 3) * ((i ** 2) - 4.0))
            asymp = asymp + ((9.0 * (i ** 4) + 58.0 * (i ** 2) + 29.0) * (q ** 6)) / (
                64.0 * (((i ** 2) - 1.0) ** 5) * ((i ** 2) - 4.0) * ((i ** 2) - 9.0))

    return asymp

# Uses interval bisection to find a root of the equation in the given interval
# Converts numbers to floats or else python goes a bit funny
# function : function to have its root found
#        a : start point of iteration
#        b : end point of iteration
#        e : tolerance of algorithm - once abs(b - a) < e, terminates
# returns either the root or 'error' if the values of the function at the end points have the same signs


def interval_bisection(function, a, b, e):

    fa = function(a)
    fb = function(b)

    if fa == 0.0:
        return a
    elif fb == 0.0:
        return b
    elif fa * fb > 0.0:
        return "error"

    dx = abs(b - a)

    while dx > e:

        c = (a + b) / 2.0
        fc = function(c)

        if fc == 0.0:
            return c
        elif fa * fc < 0.0:
            a = a
            b = c
            fb = function(b)
        else:
            a = c
            b = b
            fa = function(a)

        dx = abs(b - a)

    return (a + b) / 2.0

# These functions return the determinant of A - qI for A the mathieu matrix
# They grow quick and are potentially numerically unstable but change in sign is all that matters
# q : mathieu parameter
# n : number of eigenvalues to return

# if q = 0 then return a list of squares - functions degenerate to sine and cosine
# Otherwise define a function tridiag_det(x) which calculates the determinant of the tridiagonal mathieu matrix A - qI
# Then perform interval bisection using the initial interval [guess - 1, guess + 1] where guess = interval(i, q, a/b)
# If no root (i.e. guess = 'error') then widen the interval
# For the first eigenvalue we can use a larger range: [guess - max(1, q), guess + 1]
# return the list of eigenvalues


def a_even(q, n):

    q = float(q)

    if q == 0.0:
        return [4 * i ** 2 for i in range(n // 2)]

    else:
        def tridiag_det(x):
            x = float(x)
            j = 3.0
            a = -x
            b = (4.0 - x) * a - 2.0 * (q ** 2)
            while j <= n:
                c = ((2.0 * j - 2.0) ** 2 - x) * b - (q ** 2) * a
                a = b
                b = c
                j = j + 1.0
            return b

        roots = []

        for j in range(n // 2):
            done = False
            k = 1
            center = interval(2.0 * j, q, 'a')

            while not done:
                if j != 0:
                    rootpot = interval_bisection(
                        tridiag_det, center - k, center + k, 10e-10)
                else:
                    rootpot = interval_bisection(
                        tridiag_det, center - max([1.0, q]) * k, center + k, 10e-10)
                if rootpot == 'error':
                    k = k + 1
                    continue
                else:
                    roots.append(rootpot)
                    # print(j, rootpot)
                    done = True

        return roots

print(a_even(1, 20))


def a_odd(q, n):

    q = float(q)

    if q == 0.0:
        return [(2 * i + 1) ** 2 for i in range(n)]

    else:
        def tridiag_det(x):
            x = float(x)
            j = 2.0
            a = 1.0
            b = 1.0 + q - x
            while j <= n:
                c = ((2 * j - 1) ** 2 - x) * b - (q ** 2) * a
                a = b
                b = c
                j = j + 1.0
            return b

        roots = []

        for j in range(n // 2):
            done = False
            k = 1
            center = interval((2.0 * j) + 1.0, q, 'a')
            # print(center)
            while not done:
                if j != 0:
                    rootpot = interval_bisection(
                        tridiag_det, center - k, center + k, 10e-10)
                else:
                    rootpot = interval_bisection(
                        tridiag_det, center - max([1.0, q]) * k, center + k, 10e-10)

                if rootpot == 'error':
                    k = k + 1
                    continue
                else:
                    roots.append(rootpot)
                    # print(j, rootpot)
                    done = True

        return roots


def b_even(q, n):

    q = float(q)

    if q == 0.0:
        return [4 * (i + 1) ** 2 for i in range(n // 2)]

    else:
        def tridiag_det(x):
            x = float(x)
            j = 2.0
            a = 1.0
            b = 4.0 - x
            while j <= n:
                c = ((2.0 * j) ** 2 - x) * b - (q ** 2) * a
                a = b
                b = c
                j = j + 1.0
            return b

        roots = []

        for j in range(n // 2):
            done = False
            k = 1
            center = interval((2.0 * j) + 2.0, q, 'b')
            # print(center)
            while not done:
                if j != 0:
                    rootpot = interval_bisection(
                        tridiag_det, center - k, center + k, 10e-10)
                else:
                    rootpot = interval_bisection(
                        tridiag_det, center - max([1.0, q]) * k, center + k, 10e-10)
                if rootpot == 'error':
                    k = k + 1
                    continue
                else:
                    roots.append(rootpot)
                    # print(j, rootpot)
                    done = True

        return roots


def b_odd(q, n):

    q = float(q)

    if q == 0.0:
        return [(2 * i + 1) ** 2 for i in range(n)]

    else:
        def tridiag_det(x):
            x = float(x)
            j = 2.0
            a = 1.0
            b = 1.0 - q - x
            while j <= n:
                c = ((2 * j - 1) ** 2 - x) * b - (q ** 2) * a
                a = b
                b = c
                j = j + 1.0
            return b

        roots = []

        for j in range(n // 2):
            done = False
            k = 1.0
            center = interval((2.0 * j) + 1.0, q, 'b')
            # print(center)
            while not done:
                if j != 0:
                    rootpot = interval_bisection(
                        tridiag_det, center - k, center + k, 10e-10)
                else:
                    rootpot = interval_bisection(
                        tridiag_det, center - max([1.0, q]) * k, center + k, 10e-10)

                if rootpot == 'error':
                    k = k + 1
                    continue

                else:
                    roots.append(rootpot)
                    # print(j, rootpot)
                    done = True

        return roots


# print(b_even(10, 30))
# print(b_odd(10, 30))

# for q in range(200):
#     print(float(q) / 10, interval(10, float(q) / 10, 'a'))
# print(a_odd(1, 30))
# print(b_even(1, 30))
# print(b_odd(1, 30))
# a0=[]
# a1=[]
# a2=[]
# a3=[]
# a4=[]
# b1=[]
# b2=[]
# b3=[]
# b4=[]
# t=[]
# for i in range(100):
#     val = float(i) * 23.0 / 100.0
#     t  = t + [val]
#     # a0 = a0 + [interval(0, val, 'a')]
#     # a1 = a1 + [interval(1, val, 'a')]
#     # a2 = a2 + [interval(2, val, 'a')]
#     # a3 = a3 + [interval(3, val, 'a')]
#     # a4 = a4 + [interval(4, val, 'a')]
#     # b1 = b1 + [interval(1, val, 'b')]
#     # b2 = b2 + [interval(2, val, 'b')]
#     # b3 = b3 + [interval(3, val, 'b')]
#     # b4 = b4 + [interval(4, val, 'b')]
#     a0 = a0 + [a_even(val, 30)[0]]
#     a1 = a1 + [a_odd(val, 30)[0]]
#     a2 = a2 + [a_even(val, 30)[1]]
#     a3 = a3 + [a_odd(val, 30)[1]]
#     a4 = a4 + [a_even(val, 30)[2]]
#     b1 = b1 + [b_odd(val, 30)[0]]
#     b2 = b2 + [b_even(val, 30)[0]]
#     b3 = b3 + [b_odd(val, 30)[1]]
#     b4 = b4 + [b_even(val, 30)[1]]

# plt.figure()
# plt.plot(t, a0, 'k-', t, a1, 'r-', t, a2, 'g-', t, a3, 'b-', t, a4, 'c-', t, b1, 'c-', t, b2, 'c-', t, b3, 'c-', t, b4, 'c-')
# plt.grid(True)
# plt.show()

def tridiag_det(x, q, n):
    x = float(x)
    j = 3.0
    a = -x
    b = (4.0 - x) * a - 2.0 * (q ** 2)
    while j <= n:
        c = ((2.0 * j - 2.0) ** 2 - x) * b - (q ** 2) * a
        a = b
        b = c
        j = j + 1.0
    return b
