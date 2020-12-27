import mathieu as ma
import mathieu_coeff as mc
import mathieu_eigen as me

# print(mc.a_even_coeff_back(-0.9368184939958155, 1.5, 20))
# print("\n\n")
# print(mc.a_odd_coeff_back(4.7467794683761895, 1.5, 20))
# print("\n\n")
# print(mc.a_even_coeff_back(9.193301047664136, 1.5, 20))
# print("\n\n")
# print(mc.a_odd_coeff_back(16.077511832583696, 1.5, 20))
# print("\n\n")
# print("\n\n")

q = 1.5

eigenval_even_a = me.a_even(q, 30)
eigenval_odd_a = me.a_odd(q, 30)

eigen_a = eigenval_even_a + eigenval_odd_a
eigen_a.sort()
print(eigen_a)
print(me.interval(0, q))
print(me.interval(1, q))
print(me.interval(2, q))
print(me.interval(3, q))