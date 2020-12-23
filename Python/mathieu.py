import mathieu_eigen as me
import mathieu_coeff as mc
import numpy as np
import matplotlib.pyplot as plt
import matplotlib as mpl


def ce(x, n, q):

    eigenval_even = me.a_even(q, 30)
    eigenval_odd = me.a_odd(q, 30)

    eigen = eigenval_even + eigenval_odd
    eigen.sort()

    if n % 2 == 0:
        coeff = mc.a_even_coeff_back(eigen[n], q, 30)

    elif n % 2 == 1:
        coeff = mc.a_odd_coeff_back(eigen[n], q, 30)

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
    
    norm = np.sqrt(norm)

    normalised = [v / norm for v in coeff]

    # print(normalised)

    if n % 2 == 0:
        normnorm = 2.0 * (normalised[0] ** 2)
        for i in range(1, len(normalised)):
            normnorm = normnorm + (normalised[i] ** 2)
    else:
        normnorm = 0.0
        for i in range(len(normalised)):
            normnorm = normnorm + (normalised[i] ** 2)

    # print(normnorm)

    val = 0.0

    for i in range(len(normalised)):
        # print(val)
        # print(float((2 * i + (n % 2))))
        # print(np.cos(float((2 * i + (n % 2))) * x))
        val = val + (normalised[i] * np.cos(float((2 * i + (n % 2))) * x))

    return val


def se(x, n, q):

    eigenval_even = me.b_even(q, 30)
    eigenval_odd = me.b_odd(q, 30)

    eigen = eigenval_even + eigenval_odd
    eigen.sort()

    if n % 2 == 0:
        coeff = mc.b_even_coeff_back(eigen[n - 1], q, 30)

    elif n % 2 == 1:
        coeff = mc.b_odd_coeff_back(eigen[n - 1], q, 30)

    else:
        return "n needs to be a positive integer"

    # print(eigen[n - 1])
    # print(coeff)

    norm = 0.0
    for i in range(len(coeff)):
        norm = norm + (coeff[i] ** 2)

    normalised = [v / np.sqrt(norm) for v in coeff]

    # print(normalised)

    normnorm = 0.0
    for i in range(len(normalised)):
        normnorm = normnorm + (normalised[i] ** 2)

    # print(normnorm)

    val = 0.0

    for i in range(1, len(normalised) + 1):
        # print(val)
        # print(float((2 * i + (n % 2))))
        # print(np.cos(float((2 * i + (n % 2))) * x))
        val = val + (normalised[i - 1] * np.sin(float((2 * i - (n % 2))) * x))

    return val


# print(ce(0.0, 0, 1))
# print(ce(0.0, 1, 1))
# print(ce(0.0, 2, 1))
# print(ce(0.0, 3, 1))
# print(ce(0.0, 4, 1))

# print(se(1.0, 1, 1))
# print(se(1.0, 2, 1))
# print(se(1.0, 3, 1))
# print(se(1.0, 4, 1))
# print(se(1.0, 5, 1))

# t = np.linspace(0.0, 2 * np.pi, 400)
# plt.figure()
# plt.plot(t, ce(t, 0, 1))
# plt.show()
# plt.plot(t, ce(t, 0, 1), 'k', t, ce(t, 1, 1), 'r', t, ce(t, 2, 1), 'g', t, ce(t, 3, 1), 'b', t, ce(t, 4, 1), 'm')
# plt.plot(t, se(t, 1, 1), 'c', t, se(t, 2, 1), 'y', t, se(t, 3, 1), 'b', t, se(t, 4, 1), 'm')
# plt.show()

# 
# # print(t)
# q = 1.5
# fig, axs = plt.subplots(3, 3, sharex=True, sharey=True)
# axs[0, 0].plot(t, ce(t, 0, q), 'peachpuff')
# axs[0, 1].plot(t, ce(t, 1, q), '-')
# axs[0, 2].plot(t, ce(t, 2, q), 'g-')
# axs[1, 0].plot(t, ce(t, 3, q), 'r-')
# axs[1, 1].plot(t, ce(t, 4, q), 'b-')
# axs[1, 2].plot(t, se(t, 1, q), 'm-')
# axs[2, 0].plot(t, se(t, 2, q), 'r-')
# axs[2, 1].plot(t, se(t, 3, q), 'r-')
# axs[2, 2].plot(t, se(t, 4, q), 'r-')

# plt.grid(True)
# plt.show()

# eigenval_even_a = me.a_even(q, 30)
# eigenval_odd_a = me.a_odd(q, 30)

# eigen_a = eigenval_even_a + eigenval_odd_a
# eigen_a.sort()
# print(eigen_a)

# eigenval_even_b = me.b_even(q, 30)
# eigenval_odd_b = me.b_odd(q, 30)

# eigen_b = eigenval_even_b + eigenval_odd_b
# eigen_b.sort()
# print(eigen_b)
# q = 100
# plt.figure()
# for i in range(1, 100):
#     plt.plot(t, se(t, 3, i), 'k-')
# # plt.plot(t, se(t, 1, q), 'k')
# # plt.plot(t, ce(t, 0, q), 'k', t, ce(t, 1, q), 'r', t, ce(t, 2, q), 'g', t, ce(t, 3, q), 'b', t, ce(t, 4, q), 'm')
# # plt.plot(t, se(t, 1, q), 'c', t, se(t, 2, q), 'y', t, se(t, 3, q), 'b', t, se(t, 4, q), 'm'
# # , t, se(t, 5, q), 'm', t, se(t, 6, q), 'm', t, se(t, 7, q), 'm', t, se(t, 8, q), 'm', t, se(t, 9, q), 'm')
# # plt.plot(t, se(t, 10, q), 'b')
# plt.grid(True)
# plt.show()


