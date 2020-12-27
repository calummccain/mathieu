import mathieu_eigen as me
import mathieu_coeff as mc
import mathieu as ma
import bessel as be
import numpy as np
import matplotlib.pyplot as plt

def cem(x, n, q):

    n_max = 30

    eigenval_even = me.a_even(q, n_max)
    eigenval_odd = me.a_odd(q, n_max)

    eigen = eigenval_even + eigenval_odd
    eigen.sort()

    if n % 2 == 0:
        coeff = mc.a_even_coeff_back(eigen[n], q, n_max)

    elif n % 2 == 1:
        coeff = mc.a_odd_coeff_back(eigen[n], q, n_max)

    else:
        return "n needs to be a positive integer"

    # print(eigen[n])
    # print(coeff)

    if n % 2 == 0:
        norm = 2.0 * (coeff[0] ** 2)
        for i in range(1, len(coeff)):
            norm = norm + (coeff[i] ** 2)
    else:
        norm = 0.0
        for i in range(len(coeff)):
            norm = norm + (coeff[i] ** 2)

    # if n == 0:
    #     norm = norm / 2

    normalised = [v / np.sqrt(norm) for v in coeff]

    val = 0.0

    besselval = be.besselj_list(2 * len(normalised) + 1, 2.0 * np.sqrt(q) * x)
    # print(besselval)

    for i in range(len(normalised)):
        # print(val)
        # print(float((2 * i + (n % 2))))
        # print(np.cos(float((2 * i + (n % 2))) * x))
        if normalised[i] > 10e-10:
            val = val + (normalised[i] * besselval[2 * i + (n % 2)])
        # print(normalised[i], besselval[2 * i + (n % 2)], val)
        # val = val + (normalised[i] * np.cosh(x))

    # print(ma.ce(0.0, n, q))
    # print(normalised[0])
    # print(ma.ce(0.0, n, q) , normalised[0])
    # val = val / ma.ce(np.pi / 2.0, n, q)

    # if n % 4 == 2:
    #     val = -val

    return val

# print(cem(20, 0, 5))

q = 1.0
t = np.linspace(0.0, 20.0, 200)
cemlist0 = []
for val in t:
    cemlist0.append(cem(val, 0, q))

cemlist2 = []
for val in t:
    cemlist2.append(cem(val, 2, q))

cemlist4 = []
for val in t:
    cemlist4.append(cem(val, 4, q))

cemlist6 = []
for val in t:
    cemlist6.append(cem(val, 6, q))

cemlist8 = []
for val in t:
    cemlist8.append(cem(val, 8, q))

cemlist10 = []
for val in t:
    cemlist10.append(cem(val, 10, q))

plt.figure()
plt.plot(t, cemlist0, 'k-')
plt.plot(t, cemlist2, 'r-')
plt.plot(t, cemlist4, 'g-')
plt.plot(t, cemlist6, 'b-')
plt.plot(t, cemlist8, 'm-')
plt.plot(t, cemlist10, 'c-')
plt.grid(True)
plt.show()


# print(cemlist0[0], cemlist2[0], cemlist4[0], cemlist6[0], cemlist8[0])